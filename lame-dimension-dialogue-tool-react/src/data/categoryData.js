export default {
    moves: [
        {
            id: 'eviction',
            name: {
                en: "Eviction",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            abbreviation: {
                en: "Eviction",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            power: 0,
            charge: 0,
            wait: 0,
            form: 0,
            size: 0,
            target: 0,
            condition: 0,
            healHP: 0,
            healLife: 0,
            buffFactor: 0,
            forbidden: 0,
            item: 0,
        },
    ],
    enemies: [
        {
            id: "mafia",
            characterName:{
                en: "Mad Meats Grunt",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            hp: 25,
            hpMax: 25,
            strength: 1,
            defense: 1,
            walkWait: 1,
            numberOfMoves: 1,
            moneyHeld: 2,
            experienceHeld: 10,
            behaviorType: 0,
            turnIcon: "spr_mafiaicon",
            battleMoveName: [
                "pipeswing",
            ],
            hurtVoice: [
                "snd_mafiahurt1",
                "snd_mafiahurt2",
            ],
            talkLine: {
                en: [
                    "Are you resisting Mad Meats?",
                    "Don't eat anywhere else!",
                    "This is perfectly ethical!",
                ],
                es: [
                    "",
                    "",
                    "",
                ],
                jp: [
                    "マッドミートに盾突くのか？",
                    "よその店でで食うなよ！",
                    "倫理的にもOKってな！",
                ],
                fr: [
                    "",
                    "",
                    "",
                ],
                br: [
                    "",
                    "",
                    "",
                ],
                ch: [
                    "",
                    "",
                    "",
                ],
                de: [
                    "",
                    "",
                    "",
                ],
                ru: [
                    "",
                    "",
                    "",
                ],
            },
            talkLine: {
                en: [
                    "Are you resisting Mad Meats?",
                    "Don't eat anywhere else!",
                    "This is perfectly ethical!",
                ],
                es: [
                    "",
                    "",
                    "",
                ],
                jp: [
                    "マッドミートに盾突くのか？",
                    "よその店でで食うなよ！",
                    "倫理的にもOKってな！",
                ],
                fr: [
                    "",
                    "",
                    "",
                ],
                br: [
                    "",
                    "",
                    "",
                ],
                ch: [
                    "",
                    "",
                    "",
                ],
                ru: [
                    "",
                    "",
                    "",
                ],
            }
        }
    ],
    weapons: [
        {
            id: "dentedclub",
            name: {
                en: "Dented Club",
                es: "",
                jp: "ボロいゴルフクラブ ",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            description: {
                en: "Old club that is no longer viable for golf.",
                es: "",
                jp: "古くてゴルフには使えそうにない",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            strength: 5,
            defense: 0,
            bonus: "None",
            type: 0,
            compatibility: 0,
            prices: 0,
        }
    ],
    armors: [
        {
            id: "longsleeves",
            name: {
                en: "Long Sleeves",
                es: "",
                jp: "長袖",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            description: {
                en: "Old club that is no longer viable for golf.",
                es: "",
                jp: "古くてゴルフには使えそうにない",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            strength: 0,
            defense: 5,
            bonus: "None",
            type: 1,
            compatibility: 0,
            prices: 0,
        }
    ],
    accessories: [
        {
            id: "pocketlint",
            name: {
                en: "Pocket Lint",
                es: "",
                jp: "ポケットの布切れ",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            description: {
                en: "This is just dirt.",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            strength: 0,
            defense: 5,
            bonus: "None",
            type: 1,
            compatibility: 0,
            prices: 0,
        }
    ],
    items: [
        {
            id: "taco",
            name: {
                en: "Taco",
                es: "",
                jp: "タコス",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            abbreviation: {
                en: "Taco",
                es: "",
                jp: "タコス",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            description: {
                en: "Heals 30 HP.",
                es: "",
                jp: "30HP回復する",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            effect: 0,
            healHP: 30,
            healLife: 0,
            buffFactor: 0,
            bonus: "None",
            type: 1,
            compatibility: 0,
            prices: 0,
            overworld: 1,
        }
    ],
    keyItems: [
        {
            id: "taco",
            name: {
                en: "Taco",
                es: "",
                jp: "タコス",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            description: {
                en: "Heals 30 HP.",
                es: "",
                jp: "30HP回復する",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            effect: 0,
            healHP: 0,
            healLife: 0,
            buffFactor: 0,
            bonus: "None",
            type: 1,
            compatibility: 0,
            prices: 0,
            overworld: 0,
        }
    ],
    locations: [
        {
            id: "falltowntaco",
            room: "rm_falltowntaco",
            section: {
                en: "Shinecoast City",
                es: "",
                jp: "シャインコースト・シティ",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            subsection: {
                en: "Tanako's Tacos",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
            gridX: 0,
            gridY: 0,
            color: "orange",
            shape: 0,
        }
    ],
    ui: [
        {
            id: "language",
            display: {
                en: "English",
                es: "Espanol",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
        }
    ],
    other: [
        {
            id: "Example",
            display: {
                en: "Example",
                es: "",
                jp: "",
                fr: "",
                br: "",
                ch: "",
                de: "",
                ru: "",
            },
        }
    ],
};
