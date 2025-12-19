@echo off
echo Starting Mobile Recharge App...

echo Installing backend dependencies...
cd backend
call npm install

echo Installing frontend dependencies...
cd ..\frontend
call npm install

echo Starting backend server...
cd ..\backend
start "Backend" cmd /k "npm run dev"

echo Starting frontend server...
cd ..\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo App is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause