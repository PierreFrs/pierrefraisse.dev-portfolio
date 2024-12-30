import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import { StackBadgeComponent } from "@/components/shared_components/stackBadge";
import {Button} from "@nextui-org/button";

type AdminBadgesGalleryProps = {
    badges: StackBadge[];
    onBadgeDeleted: (badgeId: string) => void;
};

export function AdminBadgesGallery({ badges, onBadgeDeleted }: Readonly<AdminBadgesGalleryProps>) {

    return (
        <div className="max-w-96">
            <ul className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                    <li key={badge.id} className="flex flex-col items-center gap-2 mb-2 w-20">
                        <div className="h-20 mb-2">
                            <StackBadgeComponent
                                size={30}
                                badge={badge}
                            />
                        </div>

                        <Button
                            color="danger"
                            onClick={() => onBadgeDeleted(badge.id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
