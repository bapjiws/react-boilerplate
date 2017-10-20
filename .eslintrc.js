module.exports = {
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],

    "plugins": [
        "react",
        "prettier"
    ],

    // "parser": "typescript-eslint-parser",

    "rules": {
        "prettier/prettier":  ["error", {"singleQuote": true}],

        "react/jsx-filename-extension": ["error", {"extensions": [".js", ".jsx"]}],

        "import/extensions": ["error", "always", {
            "js": "never",
            "jsx": "never"
        }],

        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },

    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx"]
            }
        },

        "import/core-modules": [ "autoprefixer" ]
    }
};