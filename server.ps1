$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Server running at $prefix"
    Write-Host "Serving files from $PSScriptRoot"
} catch {
    Write-Host "Failed to bind to ${prefix}: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrEmpty($path)) {
            $path = "/index.html"
        }

        # API: /api/send-otp
        if ($path -eq "/api/send-otp") {
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
            $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

            if ($request.HttpMethod -eq "OPTIONS") {
                $response.StatusCode = 200
                $response.Close()
                continue
            }

            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $rawBody = $reader.ReadToEnd()
            $body = $null
            try {
                $body = $rawBody | ConvertFrom-Json
            } catch {}

            $target = if ($body) { $body.target } else { "" }
            $code = if ($body) { $body.code } else { "" }
            $provider = if ($body) { $body.provider } else { "simulation" }
            $apiKey = if ($body) { $body.apiKey } else { "" }

            $resultObj = @{
                ok = $true
                target = $target
                code = $code
                provider = $provider
                timestamp = (Get-Date).ToString("o")
            }

            if ($provider -eq "fast2sms" -and -not [string]::IsNullOrEmpty($apiKey)) {
                $cleanPhone = ($target -replace '[^0-9]', '')
                if ($cleanPhone.Length -gt 10) { $cleanPhone = $cleanPhone.Substring($cleanPhone.Length - 10) }
                try {
                    $headers = @{
                        "authorization" = $apiKey
                        "Content-Type" = "application/json"
                    }
                    $payload = @{
                        route = "otp"
                        variables_values = $code
                        numbers = $cleanPhone
                    } | ConvertTo-Json

                    $smsResp = Invoke-RestMethod -Uri "https://www.fast2sms.com/dev/bulkV2" -Method Post -Headers $headers -Body $payload -TimeoutSec 10
                    $resultObj.ok = $true
                    $resultObj.smsResponse = $smsResp
                    $resultObj.message = "Real SMS dispatched to +91 $cleanPhone via Fast2SMS"
                } catch {
                    $resultObj.ok = $false
                    $resultObj.error = $_.Exception.Message
                    $resultObj.message = "Fast2SMS dispatch failed: " + $_.Exception.Message
                }
            } else {
                $resultObj.ok = $false
                $resultObj.error = "NO_LIVE_GATEWAY"
                $resultObj.message = "No active SMS gateway credentials provided."
            }

            $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes(($resultObj | ConvertTo-Json -Depth 4))
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $jsonBytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($jsonBytes, 0, $jsonBytes.Length)
            $response.Close()
            continue
        }

        # sanitize path
        $cleanPath = $path.TrimStart('/').Replace('/', '\')
        $fullPath = Join-Path $PSScriptRoot $cleanPath

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.AddHeader("Pragma", "no-cache")
            $response.AddHeader("Expires", "0")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $notFoundBytes.Length
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }
        $response.Close()
    } catch {
        # continue loop
    }
}
