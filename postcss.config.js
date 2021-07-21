module.exports = {
    plugins: {
        "postcss-preset-env": {
            stage: 0,
            feature: {
                // 嵌套
                "nesting-rules": true
            }
        }
    }
}