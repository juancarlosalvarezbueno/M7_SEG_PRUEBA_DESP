
echo "Esperando a que MySQL esté disponible..."
while ! nc -z mysql-libros 3306; do
    sleep 1
done

echo "MySQL está disponible. Iniciando la app..."
exec "$@"
