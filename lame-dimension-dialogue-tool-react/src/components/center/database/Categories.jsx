import DataTable from './DataTable';
import moveTemplate from './templates/move.template';

// TODO Add more templates for each category, or make these customizable through the ui.
export default {
    characters: {
        title: "Characters",
        component: 
            <DataTable 
                title="Characters"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    enemies: {
        title: "Enemies",
        component: 
            <DataTable 
                title="Enemies"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    moves: {
        title: "Moves",
        component: 
            <DataTable 
                title="Moves"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    weapons: {
        title: "Weapons",
        component: 
            <DataTable 
                title="Weapons"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    armors: {
        title: "Armors",
        component: 
            <DataTable 
                title="Armors"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    items: {
        title: "Items",
        component: 
            <DataTable 
                title="Items"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    keyItems: {
        title: "Key-Items",
        component: 
            <DataTable 
                title="Key-Items"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    preBattle: {
        title: "Pre-Battle",
        component: 
            <DataTable 
                title="Pre-Battle"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    locations: {
        title: "Locations",
        component: 
            <DataTable 
                title="Locations"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    ui: {
        title: "UI",
        component: 
            <DataTable 
                title="UI"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    locations: {
        title: "Locations",
        component: 
            <DataTable 
                title="Locations"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    },
    other: {
        title: "Other",
        component: 
            <DataTable 
                title="Other"
                template={moveTemplate} 
                initialData={[
                    {
                        id: "eviction",
                        name: "Eviction",
                        power: 0,
                        charge: 0,
                        wait: 0,
                        form: 0,
                        size: 0,
                        target: 0,
                        condition: 0
                    }
                ]} />
    }
};
