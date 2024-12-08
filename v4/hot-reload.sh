trap bye SIGINT
bye() {
    echo "exiting..."
    exit
}

while true; 
    do find assets/ | entr -d sh './style.sh'; 
done