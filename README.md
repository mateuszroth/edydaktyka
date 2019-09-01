# System eDydaktyka
System stworzony na podstawie aplikacji edu.andrzeju.pl.

## Wymagania

Do projektu wymagany jest Node.js w wersji 12+.

Konieczne jest zainstalowanie zależności:
```
npm run setup
```

## Skrypty

1. Uruchamianie projektu - development:
```
npm start
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