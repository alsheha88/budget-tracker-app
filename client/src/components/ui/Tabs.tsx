import * as Tabs from "radix-ui/tabs";

type TabsProps = {
    triggers: string[];
}

function TabsComponent({triggers}:TabsProps) {
	return <Tabs.Root>
        {triggers.map((t) => (
            <Tabs.Trigger key={t} value={t}>{t}</Tabs.Trigger>
        ))}

    </Tabs.Root>;
}

export default TabsComponent;
