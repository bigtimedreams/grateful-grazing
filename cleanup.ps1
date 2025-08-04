# ----------------------------------------------
#  cleanup.ps1  (run from project root)
# ----------------------------------------------

$proj = Get-Location   # current folder (should be C:\grateful-grazing)

# 1) Remove the obsolete "pages" directory
$pagesDir = Join-Path $proj 'pages'
if (Test-Path $pagesDir) {
  Write-Host "Deleting legacy folder: $pagesDir"
  Remove-Item $pagesDir -Recurse -Force
}

# 2) Delete an EMPTY components/Layout.jsx (skip if it has code)
$layoutFile = Join-Path $proj 'components\Layout.jsx'
if (Test-Path $layoutFile) {
  $content = (Get-Content $layoutFile -Raw).Trim()
  if ($content.Length -eq 0) {
    Write-Host "Removing empty file: $layoutFile"
    Remove-Item $layoutFile -Force
  } else {
    Write-Host "Keeping non-empty Layout.jsx"
  }
}

# 3) Remove template SVGs from /public (logo is preserved)
$demoSvgs = @('file.svg','globe.svg','next.svg','vercel.svg','window.svg')
foreach ($svg in $demoSvgs) {
  $svgPath = Join-Path $proj "public\$svg"
  if (Test-Path $svgPath) {
    Write-Host "Removing demo icon: $svg"
    Remove-Item $svgPath -Force
  }
}

Write-Host "`n✅  Cleanup complete.  Run 'npm run dev' to verify the site still renders."
