@echo off
title OmniPrep English Platform
echo ====================================================
echo   Dang khoi chay OmniPrep English...
echo ====================================================

REM Mo trinh duyet tu dong vao dia chi http://localhost:3000
start http://localhost:3000

REM Khoi dong server Node.js
node server.js

pause
