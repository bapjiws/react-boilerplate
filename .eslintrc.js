module.exports = {
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],

    "plugins": [
        "react",
        "prettier",
        "typescript"
    ],

    "parser": "typescript-eslint-parser",

    "rules": {
        "prettier/prettier":  ["error", {"singleQuote": true}],

        "react/jsx-filename-extension": ["error", {"extensions": [".jsx", ".tsx"]}],

        "import/extensions": ["error", "always", {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
        }],

        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },

    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        },

        "import/core-modules": [ "autoprefixer" ]
    }
};