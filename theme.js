module.exports = {
    backgroundColor: {
        primary: "#158cba",
        secondary: "#f0f0f0",
        success: "#28b62c",
        info: "#75caeb",
        warning: "#ff851b",
        danger: "#ff4136",
        light: "#f6f6f6",
        dark: "#232a2f",
        link: "#158cba",
    },
    get borderColor() {
        return this.backgroundColor;
    },
    get outlineColor() {
        return this.backgroundColor;
    },
    get textColor() {
        return this.backgroundColor;
    },
    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
    }
}