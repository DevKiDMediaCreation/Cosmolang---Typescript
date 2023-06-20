@echo off
cls
title Run Cosmolang Compiler by Deno in Typescript
rem color 9F

deno run -A main.ts

echo The compiler run again. Please wait a few seconds...

echo Boot the compiler up...
rem CHOICE /N /C YN /T 1 /D Y >NUL

rem cls
rem run