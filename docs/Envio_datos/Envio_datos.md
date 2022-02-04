# Datos enviados por la estacion

## Formato de los datos enviados

Los datos se comprimen para ser enviados en un payload menor a 50 bytes. Esto porque el modem limita las transmisiones a ese tamaño.

En [este documento](formato_trama.xlsx) se explica el significado de cada byte.

> Actualmente el software usa el **ReportID 03**

## Ejemplo de decodificacion

En [este archivo](decoder.js) se implementa un algoritmo para decodificar el payload usando NodeJS.

## Integracion con otro servicio

La plataforma de rockblock permite el reenvio de los datos recibidos a uno o mas endpoits HTTP en formato **JSON** o en formato **x-www-form-urlencoded**.

Los siguiente datos de ejemplo fueron obtenidos usando https://mockbin.org/

### Formato JSON

Info sobre el request

```JSON
{
  "method": "POST",
  "url": "http://mockbin.org/bin/39456195-28d0-4f6c-94b4-1852420ad38c?foo=bar&foo=baz",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [
    { "name": "host", "value": "mockbin.org" },
    { "name": "connection", "value": "close" },
    { "name": "accept-encoding", "value": "gzip" },
    { "name": "x-forwarded-for", "value": "212.71.235.32, 162.158.159.25" },
    { "name": "cf-ray", "value": "6d6e98a0ba8be668-LHR" },
    { "name": "x-forwarded-proto", "value": "http" },
    { "name": "cf-visitor", "value": "{\"scheme\":\"http\"}" },
    { "name": "user-agent", "value": "Rock7PushApi" },
    { "name": "content-type", "value": "application/json; charset=utf-8" },
    { "name": "cf-connecting-ip", "value": "212.71.235.32" },
    { "name": "cdn-loop", "value": "cloudflare" },
    { "name": "x-request-id", "value": "d1a159f1-662b-427a-bdc3-024321f5b465" },
    { "name": "x-forwarded-port", "value": "80" },
    { "name": "via", "value": "1.1 vegur" },
    { "name": "connect-time", "value": "0" },
    { "name": "x-request-start", "value": "1643754332405" },
    { "name": "total-route-time", "value": "0" },
    { "name": "content-length", "value": "1066" }
  ],
  "queryString": [{ "name": "foo", "value": ["bar", "baz"] }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"momsn\":932,\"data\":\"4162636465666768696a6b6c6d6e6f707172737475767778797a31323334353637383930\",\"serial\":16949,\"iridium_latitude\":37.6630,\"iridium_cep\":101.0,\"JWT\":\"eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSb2NrIDciLCJpYXQiOjE2NDM3NTQzMzIsImRhdGEiOiI0MTYyNjM2NDY1NjY2NzY4Njk2YTZiNmM2ZDZlNmY3MDcxNzI3Mzc0NzU3Njc3Nzg3OTdhMzEzMjMzMzQzNTM2MzczODM5MzAiLCJkZXZpY2VfdHlwZSI6IlJPQ0tCTE9DSyIsImltZWkiOiIzMDAyMzQwNjgwMzY2NTAiLCJpcmlkaXVtX2NlcCI6IjEwMS4wIiwiaXJpZGl1bV9sYXRpdHVkZSI6IjM3LjY2MzAiLCJpcmlkaXVtX2xvbmdpdHVkZSI6IjE3MS40ODg0IiwibW9tc24iOiI5MzIiLCJzZXJpYWwiOiIxNjk0OSIsInRyYW5zbWl0X3RpbWUiOiIyMi0wMi0wMSAyMjoyNTozMSJ9.Fy4TpnUPX1-_eBdROXAT4itd-TKOfDh8lM_0cVtWz7i7IRYSG__o02RNDlvUrkqtV1359NfwtRSnofOEWoNbT0Dr5GJnl4Jz7fb-5cG4UcjvX5hDH4Y_fgNS_bS48_qGjjQKjPM_JfKLbW7cBLaRSWqxFec3uZ1rHzclg-uShqeQxX81Fl0Iykel3JCBs8Ho3QH_bDfoFmahPZNohETeAx9Bn-imzeU5yDW4mSTgu2R6MM1kAvCIVmjmQnbZY5W266AuFB8eL24HC9viaqaeyCgywrE7H3VkQSWO6WaGJLLFZczyocprguQXmEQsbMUFRAw8e17Q2tqbnHVm3TmBRw\",\"imei\":\"300234068036650\",\"device_type\":\"ROCKBLOCK\",\"transmit_time\":\"22-02-01 22:25:31\",\"iridium_longitude\":171.4884}",
    "params": []
  },
  "headersSize": 592,
  "bodySize": 1066
}
```

Body

```JSON
{
  "momsn": 932,
  "data": "4162636465666768696a6b6c6d6e6f707172737475767778797a31323334353637383930",
  "serial": 16949,
  "iridium_latitude": 37.663,
  "iridium_cep": 101.0,
  "JWT": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSb2NrIDciLCJpYXQiOjE2NDM3NTQzMzIsImRhdGEiOiI0MTYyNjM2NDY1NjY2NzY4Njk2YTZiNmM2ZDZlNmY3MDcxNzI3Mzc0NzU3Njc3Nzg3OTdhMzEzMjMzMzQzNTM2MzczODM5MzAiLCJkZXZpY2VfdHlwZSI6IlJPQ0tCTE9DSyIsImltZWkiOiIzMDAyMzQwNjgwMzY2NTAiLCJpcmlkaXVtX2NlcCI6IjEwMS4wIiwiaXJpZGl1bV9sYXRpdHVkZSI6IjM3LjY2MzAiLCJpcmlkaXVtX2xvbmdpdHVkZSI6IjE3MS40ODg0IiwibW9tc24iOiI5MzIiLCJzZXJpYWwiOiIxNjk0OSIsInRyYW5zbWl0X3RpbWUiOiIyMi0wMi0wMSAyMjoyNTozMSJ9.Fy4TpnUPX1-_eBdROXAT4itd-TKOfDh8lM_0cVtWz7i7IRYSG__o02RNDlvUrkqtV1359NfwtRSnofOEWoNbT0Dr5GJnl4Jz7fb-5cG4UcjvX5hDH4Y_fgNS_bS48_qGjjQKjPM_JfKLbW7cBLaRSWqxFec3uZ1rHzclg-uShqeQxX81Fl0Iykel3JCBs8Ho3QH_bDfoFmahPZNohETeAx9Bn-imzeU5yDW4mSTgu2R6MM1kAvCIVmjmQnbZY5W266AuFB8eL24HC9viaqaeyCgywrE7H3VkQSWO6WaGJLLFZczyocprguQXmEQsbMUFRAw8e17Q2tqbnHVm3TmBRw",
  "imei": "300234068036650",
  "device_type": "ROCKBLOCK",
  "transmit_time": "22-02-01 22:25:31",
  "iridium_longitude": 171.4884
}
```

### Formato x-www-form-urlencoded

Info sobre el request

```JSON
{
  "method": "POST",
  "url": "http://mockbin.org/bin/39456195-28d0-4f6c-94b4-1852420ad38c?foo=bar&foo=baz",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [
    { "name": "host", "value": "mockbin.org" },
    { "name": "connection", "value": "close" },
    { "name": "accept-encoding", "value": "gzip" },
    { "name": "x-forwarded-for", "value": "212.71.235.32, 172.70.162.129" },
    { "name": "cf-ray", "value": "6d6e947a68687531-LHR" },
    { "name": "x-forwarded-proto", "value": "http" },
    { "name": "cf-visitor", "value": "{\"scheme\":\"http\"}" },
    { "name": "user-agent", "value": "Rock7PushApi" },
    { "name": "content-type", "value": "application/x-www-form-urlencoded" },
    { "name": "cf-connecting-ip", "value": "212.71.235.32" },
    { "name": "cdn-loop", "value": "cloudflare" },
    { "name": "x-request-id", "value": "5caf261e-b5c3-4374-a5e4-b87d1a561169" },
    { "name": "x-forwarded-port", "value": "80" },
    { "name": "via", "value": "1.1 vegur" },
    { "name": "connect-time", "value": "0" },
    { "name": "x-request-start", "value": "1643754162439" },
    { "name": "total-route-time", "value": "0" },
    { "name": "content-length", "value": "249" }
  ],
  "queryString": [{ "name": "foo", "value": ["bar", "baz"] }],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "text": "imei=300234068036650&device_type=ROCKBLOCK&serial=16949&momsn=376&transmit_time=22-02-01%2022%3A22%3A40&iridium_latitude=60.9634&iridium_longitude=36.0877&iridium_cep=79.0&data=4162636465666768696a6b6c6d6e6f707172737475767778797a31323334353637383930",
    "params": [
      { "name": "imei", "value": "300234068036650" },
      { "name": "device_type", "value": "ROCKBLOCK" },
      { "name": "serial", "value": "16949" },
      { "name": "momsn", "value": "376" },
      { "name": "transmit_time", "value": "22-02-01 22:22:40" },
      { "name": "iridium_latitude", "value": "60.9634" },
      { "name": "iridium_longitude", "value": "36.0877" },
      { "name": "iridium_cep", "value": "79.0" },
      {
        "name": "data",
        "value": "4162636465666768696a6b6c6d6e6f707172737475767778797a31323334353637383930"
      }
    ]
  },
  "headersSize": 593,
  "bodySize": 249
}
```

Body

```
imei=300234068036650&device_type=ROCKBLOCK&serial=16949&momsn=376&transmit_time=22-02-01%2022%3A22%3A40&iridium_latitude=60.9634&iridium_longitude=36.0877&iridium_cep=79.0&data=4162636465666768696a6b6c6d6e6f707172737475767778797a31323334353637383930
```
