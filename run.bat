@echo off

rem Open a new command prompt window to run the backend server
start cmd /k "cd .\Backend\ && npm run dev"

rem Open a new command prompt window to run the frontend application
start cmd /k "cd .\Frontend\restaurant_app\ && npm start"