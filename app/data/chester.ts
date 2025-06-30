export const mockWarehouses = [
  {
    id: "office-room",
    name: "Office Room",
    icon: "computer-line",
    locator: "home-2floor-office",
    storageUnits: [
      {
        id: "white-box",
        name: "Grandfather's White Box",
        description: "A white chest-like box with a lid. My grandfather made this box many years ago.",
      },
      {
        id: "kallax-2x2",
        name: "White 2x2 Kallax",
        description: "A white 2x2 Kallax next to my desk",
        items: [
          {
            id: "item-1",
            name: "Storz & Bickel Mighty Vaporizer",
            category: "cannabis",
          },
          {
            id: "item-2",
            name: "Regular Hydroflask Cap",
            description: "The original cap for the Hydroflask. I have replaced it with one that works like a sippy-cup.",
            category: "replacement",
          },
          {
            id: "item-3",
            name: "Nintendo Switch 1 - Joy-Con Jig",
            description: "Joy-Con Jig used to hack the Nintendo Switch if it's a model from the first generation.",
            category: "electronics",
          },
          {
            id: "item-4",
            name: "Emotiv Brainwave Headset",
            description: "A headset that allows for brainwave reading. This can be used to control the computer with my mind.",
            category: "electronics",
          },
        ],
      },
      {
        id: "bookshelf",
        name: "Large White Bookshelf",
        description: "A large white bookshelf from the floor to the ceiling.",
        items: [
          {
            id: "books/harry-potter",
            name: "Harry Potter Books",
            description: "All seven Harry Potter books.",
            category: "book",
            setItems: [
              "Harry Potter and the Philosopher's Stone",
              "Harry Potter and the Chamber of Secrets",
              "Harry Potter and the Prisoner of Azkaban",
              "Harry Potter and the Goblet of Fire",
              "Harry Potter and the Order of the Phoenix",
              "Harry Potter and the Half-Blood Prince",
              "Harry Potter and the Deathly Hallows",
            ],
          },
          {
            id: "books/tributes-of-panem",
            name: "The Tributes of Panem",
            description: "The first three books in the Hunger Games series.",
            category: "book",
            setItems: ["The Hunger Games", "Catching Fire", "Mockingjay"],
          },
          {
            id: "books/percy-jackson",
            name: "Percy Jackson",
            description: "The first five books in the Percy Jackson series.",
            category: "book",
            setItems: ["The Lightning Thief", "The Sea of Monsters", "The Titan's Curse", "The Battle of the Labyrinth", "The Last Olympian"],
          },
          {
            id: "books/lord-of-the-rings",
            name: "The Lord of the Rings",
            description: "The whole trilogy in a single book.",
            category: "book",
          },
          {
            id: "figurine/asuna",
            name: "Asuna Figurine (Sword Art Online)",
            description: "Gotten from an online store.",
            category: "figurine",
          },
          {
            id: "figurine/shinobu",
            name: "Shinobu Figurine (Demon Slayer)",
            description: "Gotten from an online store.",
            category: "figurine",
          },
          {
            id: "figurine/megumin",
            name: "Megumin Figurine (Konosuba)",
            description: "Gotten from an anime convention.",
            category: "figurine",
          },
          {
            id: "figurine/nezuko",
            name: "Small Nezuko Figurine (Demon Slayer)",
            description: "Gotten from an anime convention.",
            category: "figurine",
          },
          {
            id: "figurine/ellie",
            name: "Ellie Figurine (Last of Us)",
            description: "Limited edition Ellie figurine. It came with the limited edition of the game.",
            category: "figurine",
          },
          {
            id: "figurine/little-ghost",
            name: "Little Ghost Figurine (Hollow Knight)",
            description: "Got it from the boys for my birthday.",
            category: "figurine",
          },
          {
            id: "figurine/mercy",
            name: "Mercy Figurine (Overwatch)",
            description: "Got it from the official Overwatch online store.",
            category: "figurine",
          },
          // Collectibles
          {
            id: "collectible/aegis-2016",
            name: "Level 1000 Collector's Aegis (TI 2016)",
            category: "collectible",
          },
          {
            id: "collectible/aegis-2018",
            name: "Level 1000 Collector's Aegis (TI 2018)",
            category: "collectible",
          },
          {
            id: "collectible/aegis-2019",
            name: "Level 1000 Collector's Aegis (TI 2019)",
            category: "collectible",
          },
          {
            id: "collectible/aegis-2020",
            name: "Level 1000 Collector's Aegis (TI 2020)",
            category: "collectible",
          },
          {
            id: "collectible/roshan-2019",
            name: "Level 2000 Collector's Roshan",
            category: "collectible",
          },
          {
            id: "collectible/roshan-2020",
            name: "Level 2000 Collector's Roshan",
            category: "collectible",
          },
          // Gaming
          {
            id: "gaming/amiibo-link-botw",
            name: "Link Amiibo (from Breath of the Wild)",
            category: "gaming",
          },
          {
            id: "gaming/amiibo-link-wolf",
            name: "Link Amiibo with Midna (from Twilight Princess)",
            category: "gaming",
          },
          {
            id: "gaming/amiibo-ganondorf",
            name: "Ganondorf Amiibo",
            category: "gaming",
          },
          {
            id: "gaming/nintendo-entertainment-system",
            name: "Nintendo Entertainment System",
            category: "gaming",
          },
          {
            id: "gaming/nintendo-switch",
            name: "Nintendo Switch",
            category: "gaming",
          },
          {
            id: "gaming/nintendo-3ds-xl",
            name: "Nintendo 3DS XL",
            category: "gaming",
          },
          {
            id: "gaming/commodore-64-mini",
            name: "Commodore 64 Mini",
            category: "gaming",
            setItems: ["Stick Controller"],
          },
          {
            id: "gaming/chess",
            name: "Chess Set",
            description: "A chess set from IKEA I have since I can think.",
            category: "gaming",
          },
          {
            id: "gaming/scotland-yard",
            name: "Scotland Yard",
            category: "gaming",
          },
          {
            id: "gaming/controller-ps4",
            name: "PS4 Controller",
            category: "gaming",
          },
          {
            id: "gaming/controller-xbox",
            name: "Xbox One Controller",
            category: "gaming",
          },
          // Other
          {
            id: "knife/karambit",
            name: "Karambit",
            description: "The exact model of the Karambit used in CS:GO and CS2.",
            category: "other",
          },
          {
            id: "knife/balisong",
            name: "Balisong",
            description: "A balisong knife I have once found next to the train tracks in Niederhasli.",
            category: "other",
          },
        ],
      },
    ],
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    icon: "hotel-bed-line",
    locator: "home-2floor-bedroom",
    storageUnits: [
      {
        id: "kallax-2x4",
        name: "Tan 2x4 Kallax",
        description: "A tan 2x4 Kallax next to the door to my room.",
      },
      {
        id: "closet",
        name: "Closet",
        description: "My open closet behind my door. Things can also be stored next to or even under it.",
      },
      {
        id: "kallax-1x2",
        name: "Tan 1x2 Kallax",
        description: "A tan 1x2 Kallax at the foot end of my bed.",
      },
      {
        id: "bed",
        name: "Bed",
        description: "My bed. All the things are found under it.",
      },
      {
        id: "bookcase",
        name: "Bookcase / Nightstand",
        description: "A bookcase I have next to my bed which serves as my nightstand.",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    icon: "wheelchair-line",
    locator: "home-2floor-bathroom",
    storageUnits: [
      {
        id: "mirror",
        name: "Mirror Shelf",
        description: "A shelf above the sink.",
      },
      {
        id: "cabinet",
        name: "Cabinet",
        description: "A tall cabinet next to the door.",
      },
    ],
  },
  {
    id: "hallway",
    name: "Hallway",
    icon: "stairs-line",
    locator: "home-2floor-hallway",
    storageUnits: [
      {
        id: "fridge-area",
        name: "Next to the Fridge",
        description: "A mess next to the fridge.",
      },
    ],
  },
  {
    id: "entrance",
    name: "Entrance",
    icon: "door-line",
    locator: "home-1floor-entrance",
    storageUnits: [
      {
        id: "closet",
        name: "Wall Closet",
        description: "A white wall closet to the right of the stairs.",
      },
      {
        id: "sideboard",
        name: "Sideboard",
        description: "Wooden sideboard next to the door.",
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "water-percent-line",
    locator: "home-1floor-kitchen",
    storageUnits: [
      {
        id: "cabinets",
        name: "Kitchen Cabinets",
        description: "Any of the kitchen cabinets.",
      },
    ],
  },
  {
    id: "living-room",
    name: "Living Room",
    icon: "sofa-line",
    locator: "home-1floor-living-room",
    storageUnits: [
      {
        id: "gray-tower-2x1",
        name: "Small gray tower",
        description: "The 2x1 gray tower to the left of the TV.",
      },
      {
        id: "gray-tower-4x1",
        name: "Large gray tower",
        description: "The 4x1 gray tower to the right of the TV.",
      },
    ],
  },
  {
    id: "basement",
    name: "Basement",
    icon: "stairs-line",
    locator: "home-0floor-basement",
    storageUnits: [
      {
        id: "laundry",
        name: "Laundry Room",
        description: "The laundry room in the basement.",
      },
      {
        id: "main",
        name: "Main Storage Room",
        description: "The main room in the basement. The stairs lead to the 1st floor from here. Laundry hangs here.",
      },
    ],
  },
  {
    id: "cellar",
    name: "Cellar",
    icon: "box-1-line",
    locator: "home-0floor-cellar",
    storageUnits: [],
  },
] satisfies Warehouse[];

//
//
//
//
//
//
// Interfaces
//
//
//
//
//
//

export interface Warehouse {
  id: string;
  name: string;
  icon: string;
  locator: string;
  storageUnits: StorageUnit[];
}

export interface StorageUnit {
  id: string;
  name: string;
  description: string;
  items?: StorageItem[];
}

export interface StorageItem {
  id: string;
  name: string;
  description?: string;
  category?: "book" | "figurine" | "collectible" | "electronics" | "gaming" | "other" | "cannabis" | "replacement";
  setItems?: string[];
}

const items = [
  // --- Large white bookshelf ---
  {
    id: "item-5",
    name: "Harry Potter books",
    description: "All seven Harry Potter books.",
    category: "book",
  },
  {
    id: "item-6",
    name: "The Tributes of Panem",
    description: "The first three books in the Hunger Games series.",
    category: "book",
  },
  {
    id: "item-7",
    name: "Percy Jackson",
    description: "The first five books in the Percy Jackson series.",
    category: "book",
  },
  {
    id: "item-8",
    name: "The Lord of the Rings Book",
    description: "The whole trilogy in a single book.",
    category: "book",
  },
  {
    id: "item-9",
    name: "Eragon Books",
    description: "The first four books in the Eragon series.",
    category: "book",
  },
] satisfies StorageItem[];
