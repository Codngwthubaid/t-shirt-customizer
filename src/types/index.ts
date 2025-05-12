export type themeTypes = 'dark' | 'light' | 'purple'

export type themeStyles = {
    mainBg: string,
    accent: string,
    text: string,
    formBg: string,
    border: string,
    button: string,
    heading: string,
    shadow: string
}

export type customizationFormData = {
    height : number,
    weight : number,
    build : string,
    imageUrl : string | null,
    customText : string
}

export type buildTypes = "lean" | "regular" | "athletic" | "big"