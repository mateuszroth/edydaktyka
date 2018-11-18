# System eDydaktyka - edu.andrzeju.pl

## Wymagania

Do projektu wymagany jest Node.js w wersji 10+.

Konieczne jest zainstalowanie zależności:
```
npm install && npm run start
```

## Skrypty

1. Uruchamianie projektu - development:
```
npm run dev
```

2. Budowanie projektu:
```
npm run build
```

## Dokumentacja

### Technologie

Projekt używa frameworka do React.js nazwanego [Next.js](https://nextjs.org/docs/).

Jako framework UI wykorzystano [Ant Design](https://ant.design/docs/react/introduce).

### Instrukcje dla administrator

#### Dodawanie nowej strony

Nową stronę tworzymy poprzez dodanie nowego komponentu w folderze `pages`. Nazwa pliku będzie zgodna ze ścieżką strony, tj. plik `pages/home.js` będzie dostępny pod adresem `domena.pl/home`.