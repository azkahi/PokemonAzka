# Pokemon Azka

This project is constructed from:

``` @kacgrzes/expo-template ```

Version in the `package.json` is one to one the latest expo on which the template was tested.

## Installation

Init expo with this template using:

```bash
  expo init --template=@kacgrzes/expo-template <name of your app>
```

## Documentation

This project is developed with clean architecture in mind. The `src/core` folder consist of important business logic while the `src/infra` folder consist of relevant code in regards to the framework.

## Assumption

1. A pokemon may only have 1 or no evolution at all
2. A pokemon may eat berry type of `others` indefinitely without throwing up
3. A pokemon may exceed the evolution weight threshold of evolution without evoluting

## Run Locally

Clone the project

```bash
  git clone project.git
```

Go to the project directory

```bash
  cd PokemonAzka
```

Install dependencies

```bash
  npm install
```

Start the expo server

```bash
  npm run start
```

Run on android

```bash
  npm run android
```

Run on ios
```bash
  npm run ios
```
