import { PowerIcon } from "@heroicons/react/24/outline";
import * as actions from "app/actions";
import {Button} from "@nextui-org/button";
import {Form} from "@nextui-org/form";

export default function LogoutButton() {
    return (
        <Form action={actions.signOut}>
            <Button
                type="submit"
            >
                <PowerIcon className="w-6" />
                <span>Sign Out</span>
            </Button>
        </Form>
    );
}
