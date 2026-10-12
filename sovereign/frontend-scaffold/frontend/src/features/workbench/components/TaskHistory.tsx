import { useEffect, useState } from "react";
import { Clock3, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";

interface HistoryItem {
    id: string;
    prompt: string;
    taskType: string;
    model: string;
    createdAt: string;
}

const STORAGE_KEY = "sovereign-task-history";

export default function TaskHistory() {
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    function clearHistory() {
        localStorage.removeItem(STORAGE_KEY);
        setItems([]);
    }

    return (
        <div className="history-panel">
            <div className="history-heading">
                <div>
                    <h3>Recent tasks</h3>
                    <p>Stored locally in this browser</p>
                </div>

                <Button
                    variant="secondary"
                    onClick={clearHistory}
                    disabled={!items.length}
                >
                    <Trash2 size={15} />
                    Clear
                </Button>
            </div>

            {!items.length && (
                <div className="history-empty">
                    <Clock3 size={22} />
                    <span>No recent tasks</span>
                </div>
            )}

            {items.map((item) => (
                <div className="history-item" key={item.id}>
                    <div>
                        <strong>{item.prompt}</strong>
                        <span>
                            {item.taskType} · {item.model}
                        </span>
                    </div>

                    <small>{item.createdAt}</small>
                </div>
            ))}
        </div>
    );
}

export function saveTaskToHistory(item: HistoryItem) {
    const saved = localStorage.getItem(STORAGE_KEY);
    const current: HistoryItem[] = saved ? JSON.parse(saved) : [];

    const updated = [item, ...current].slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}