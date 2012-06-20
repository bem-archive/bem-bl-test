# bem-bl-test

It is BEM-based testing project, which shows basic project structure and use of various tools.

## Installation

Prerequisites:

* [Node.JS](http://nodejs.org)
* [npm](http://npmjs.org)

### bem-bl-test setup

Clone git repo

    git clone git://github.com/bem/bem-bl-test.git

Install dependencies

    cd bem-bl-test
    npm install

`bem` utility will be installed as `./node_modules/.bin/bem`.

If you want to type `bem` and run locally installed `bem` utility you should add `./node_modules/.bin` to your `PATH`

    export PATH=./node_modules/.bin:$PATH

To install latest unstable version of `bem` globally you should run

    npm install -g bem@unstable

## bem make

To build your project run

    bem make

This will build all files. Sequental executions of `bem make` will rebuild nothing but you can force rebuild by running

    bem make --force

You can also build individual files by running

    bem make pages/example/example.html

or force rebuild by running

    bem make pages/example/example.html --force

You can also use GNU make proxy to `bem make`. Here are some examples

    make
    make clean
    make pages/example/example.html

To rebuild all files run (specifying `-B` option to `make` will not work).

    make clean all

## bem server

To build your project dynamically run

    bem server

Then point your browser to http://localhost:8080/example/example.html and you will get just built html page.

## More options

For more info see `bem make --help` and `bem server --help`.
