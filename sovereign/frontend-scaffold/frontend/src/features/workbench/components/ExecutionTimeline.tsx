import {
    CheckCircle2,
    Circle,
    Loader2,
    XCircle,
} from "lucide-react";
import type { TaskStep } from "../../../types/common.types";

interface ExecutionTimelineProps {
    steps: TaskStep[];
}

export default function ExecutionTimeline({
    steps,
}: ExecutionTimelineProps) {
    return (
        <div className="execution-timeline">
            {steps.map((step, index) => (
                <div className="timeline-item" key={step.id}>
                    <div className={`timeline-icon ${step.status}`}>
                        {step.status === "completed" && <CheckCircle2 size={18} />}
                        {step.status === "running" && (
                            <Loader2 className="spin" size={18} />
                        )}
                        {step.status === "failed" && <XCircle size={18} />}
                        {step.status === "pending" && <Circle size={18} />}
                    </div>

                    <div className="timeline-content">
                        <strong>{step.label}</strong>
                        <span>{step.status}</span>
                    </div>

                    {index < steps.length - 1 && (
                        <div className={`timeline-line ${step.status}`} />
                    )}
                </div>
            ))}
        </div>
    );
}