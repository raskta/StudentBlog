#!/bin/sh

echo "Aguardando banco de dados..."
until nc -z -v -w30 database 5432
do
  echo "Esperando conexão com o banco..."
  sleep 5
done

echo "Banco de dados pronto!"

# Rodar a aplicação
npm run start &

# Esperar um tempo para garantir que a aplicação subiu antes do seed
sleep 5

echo "Rodando seed..."
npm run seed

# Mantém o container rodando
wait
