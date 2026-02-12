@echo off
setlocal enabledelayedexpansion
cls

echo 🚀 Starting post-deploy setup...

REM Run migrations
echo 📦 Running database migrations...
call bun run migrate
if errorlevel 1 exit /b 1

REM Run seed
echo 🌱 Seeding database...
call bun run seed
if errorlevel 1 exit /b 1

REM Seed products
echo 📦 Seeding products...
call bun run seed:products
if errorlevel 1 exit /b 1

echo ✅ Post-deploy setup completed!
endlocal
