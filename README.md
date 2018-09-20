# curl_ifrs

Utility to download latest unaccompanied IFRS using curl.

## Usage

Login to eIFRS and locate your JSESSIONID in Cookie. Then, call:

```bash
{ build_ifrs_curls; echo build_ifrs_curls::execute JSESSIONID } | bash
```
