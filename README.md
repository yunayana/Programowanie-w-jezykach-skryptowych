
# Yana Trotsenko – Grupa 1, 21232

## Spis zadań laboratoryjnych

Poniżej znajdują się linki do poszczególnych laboratoriów wraz z krótkim opisem każdego projektu.

- [Lab 1](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab1)  
  Prosta strona HTML prezentująca tabelę z listą osób. Ćwiczenie w tworzeniu i stylowaniu tabel oraz podstawowych elementów HTML.

- [Lab 2](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab2)  
  Projekt wykorzystujący framework Bootstrap do responsywnego i estetycznego tworzenia strony tematycznej o wodnych liliach.

- [Lab 3](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab3)  
  Strona zawierająca formularz HTML z różnymi polami do wprowadzania danych, wraz z podstawową walidacją.

- [Lab 4](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab4)  
  Projekt, który prezentuje wykorzystanie tablic w JavaScript oraz prosty quiz interaktywny dla użytkownika.

- [Lab 5](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab5)  
  Zaawansowany quiz tematyczny związanego z kolekcją Sylvanian Families, z wykorzystaniem dynamicznego JavaScript.

- [Lab 6](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab6)  
  Pierwsze kroki w tworzeniu aplikacji w React — podstawowa struktura i komponenty.

- [Lab 8](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab8)  
  Projekt React inspirowany estetyką i stylem Ryu Murakami.

- [Lab 9](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab9)  
  Różnica w referencjach funkcji w React oraz zastosowanie useCallback dla optymalizacji renderowania komponentów.

- [Lab10](https://github.com/yunayana/Programowanie-w-jezykach-skryptowych/tree/main/Lab10)  
  Użycie hooków: useRef, useMemo, useReducer, useContext oraz useLayoutEffect wraz z prostym stylowaniem komponentów.

---

## Link do hostingu projektu

Projekt jest opublikowany i dostępny pod adresem:  
[https://yunayana.github.io/Programowanie-w-jezykach-skryptowych/](https://yunayana.github.io/Programowanie-w-jezykach-skryptowych/)

---

# Opis projektu

**Nazwa projektu:** System śledzenia postępów czytelniczych z możliwością oceniania, recenzowania i udostępniania

Projekt to aplikacja/webowa strona inspirowana estetyką i stylem kultowego anime *SoulEater*. Charakterystyczna, dynamiczna i lekko mroczna stylistyka przenika cały interfejs, nadając mu oryginalny, przyciągający wzrok charakter. Wszystkie logotypy zostały wykonane ręcznie.

---

## Cel projektu

Celem jest stworzenie wygodnego i funkcjonalnego systemu do zarządzania własną biblioteką czytelniczą, pozwalającego użytkownikom śledzić postępy w czytaniu, oceniać książki, dodawać recenzje, tworzyć notatki oraz dzielić się opiniami z innymi czytelnikami.

---

## Kluczowe funkcje (wersja początkowa)

1. **Rejestracja i logowanie użytkownika**  
   - Tworzenie konta oraz logowanie, m.in. przez e-mail lub konto Google  
   - Edycja profilu użytkownika  

2. **Zarządzanie listami książek**  
   - Dodawanie książek do trzech list: *Chcę przeczytać*, *Czytam*, *Przeczytane*  
   - Przenoszenie książek pomiędzy listami  

3. **Śledzenie postępów czytania**  
   - Wprowadzanie liczby przeczytanych stron lub procentowego postępu  
   - Wyświetlanie aktualnego stanu czytania  

4. **Wyszukiwanie książek**  
   - Integracja z Google Books API 
   - Wyszukiwanie według tytułu, autora lub ISBN  
   - Dodawanie wybranych książek do biblioteki użytkownika  

5. **Oceny i recenzje**  
   - Ocena książek w skali 1–5  
   - Dodawanie krótkich recenzji  
   - Przeglądanie opinii innych użytkowników  

6. **Zakładki i notatki**   
   - Tworzenie własnych notatek  

7. **Profil użytkownika**  
   - Przegląd list książek z podziałem na statusy  
   - Statystyki czytelnicze (np. liczba przeczytanych książek, średnia ocen)  

8. **Funkcje społecznościowe (opcjonalnie)**  
   - Obserwowanie innych użytkowników  
   - Podgląd ich aktywności czytelniczej  

---


---

## Schemat działania

```
[Użytkownik] → [Wyszukaj książkę] → [Google Books API]
                                     ↓
                        [Wybierz książkę] → [Zapisz dane w bazie]
                                                       ↓
                               [Zarządzanie ocenami, notatkami, postępem]
```

---

**Projekt stawia na połączenie funkcjonalności z unikalną estetyką SoulEater oraz indywidualnym stylem graficznym, aby czytanie i zarządzanie książkami było nie tylko użyteczne, ale i przyjemne wizualnie.**

---

*Yana Trotsenko, Grupa 1, nr indeksu: 21232*
