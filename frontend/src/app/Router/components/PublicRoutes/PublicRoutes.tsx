import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Tutorial } from "../../../../pages";
import { Layout as LayoutTutorial } from "../../../../pages/Tutorial";
import Configuration from "../../../../pages/Tutorial/pages/Configuration";
import Success from "../../../../pages/Tutorial/pages/Success/Success";

const PublicRoures: React.FC = () => (
    <Routes>
        <Route path="/" element={<Tutorial />} />
        <Route key="index" element={<LayoutTutorial />}>
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/success" element={<Success />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);
export default PublicRoures;