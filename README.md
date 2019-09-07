# System eDydaktyka
System stworzony na podstawie aplikacji edu.andrzeju.pl.

## Wymagania

Do projektu wymagany jest Node.js w wersji 12+.

Konieczne jest zainstalowanie zależności:
```
npm run setup
```

Jeśli chcemy działać na lokalnej maszynie, konieczna jest konfiguracja bazy danych. Do tego celu instalujemy oprogramowanie Docker i uruchamiamy polecenie, które uruchomi bazę danych:
```
docker-compose up
// lub
docker-compose -f docker-compose.yml up
```
Domyślnie baza danych utworzy konto o loginie `admin` i haśle `password`. Aby się zalogować, odwiedź http://localhost:5000/ dla systemu zarządzania bazą danych Adminer. Baza danych dostępna jest pod portem 3306.

Zapytania SQL inicjalizujące bazę znajdują się w pliku `./database/init_schema.sql`. Te query można uruchomić na przykład poprzez system Adminer czy z poziomu kontenera Docker:
```
docker exec -it <CONTAINER_ID> /bin/bash
mysql -u admin -ppassword edydaktyka < /tmp/database/init_schema.sql
```

## Skrypty

1. Uruchamianie projektu - development:
```
npm start
```
Lub od razu z bazą danych:
```
npm run start-with-db
```
Lub osobno frontend i backend:
```
npm run dev-backend
npm run dev-frontend
```

Strona będzie dostępna pod adresem http://localhost:3000/ a API serwerowe pod adresem http://localhost:4000/.

2. Budowanie projektu frontend:
```
npm run build-frontend
```

## Dokumentacja

### Technologie

Projekt używa frameworka do React.js nazwanego [Next.js](https://nextjs.org/docs/).

Jako framework UI wykorzystano [Ant Design](https://ant.design/docs/react/introduce).

### Instrukcje dla administrator

#### Dodawanie nowej strony

Nową stronę tworzymy poprzez dodanie nowego komponentu w folderze `pages`. Nazwa pliku będzie zgodna ze ścieżką strony, tj. plik `pages/home.js` będzie dostępny pod adresem `domena.pl/home`.