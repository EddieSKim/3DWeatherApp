import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./newLocationForm.module.css";

function NewLocationForm() {
    return (
        <div>
            New Location
            <Button>
                <Link to="/">
                    Back
                </Link>
            </Button>
        </div>
    );
}

export default NewLocationForm;