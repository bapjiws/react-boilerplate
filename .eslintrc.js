module.exports = {
    "extends": [
        "airbnb",
        // "eslint:recommended",
        // "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],

    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "prettier"
    ],

    // "parser": "typescript-eslint-parser",

    "rules": {
        // "prettier/prettier":  ["error", {"singleQuote": true}],
        //
        "react/jsx-filename-extension": ["error", {"extensions": [".js", ".jsx"]}],
        //
        // "import/extensions": ["error", "always", {
        //     "js": "never",
        //     "jsx": "never"
        // }],

        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
    //
    // "settings": {
    //     "import/resolver": {
    //         "node": {
    //             "extensions": [".js", ".jsx"]
    //         }
    //     },
    //
    //     "import/core-modules": [ "autoprefixer" ]
    // }
};