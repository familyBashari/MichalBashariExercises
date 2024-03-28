import React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import "./navBar.scss"; // קובץ סגנון CSS

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to={PATHS.addPatient} className="nav-link">
        Add Patient
      </NavLink>
      <NavLink to={PATHS.getAllPatients} className="nav-link">
        Get All Patients
      </NavLink>
      <NavLink to={PATHS.addCovid19Details} className="nav-link">
        Add Covid19 Details
      </NavLink>
      <NavLink to={PATHS.chart} className="nav-link">
        Chart
      </NavLink>
    </nav>
  );
}