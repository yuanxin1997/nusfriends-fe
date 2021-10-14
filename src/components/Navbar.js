import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../resources/Logo.png";

function Navbar() {
    return (
        <Nb>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    height: "50px",
                    alignItems: "center",
                }}
            >
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ marginRight: "16px" }}
                    />
                </Link>
                <Link to="explore">Explore</Link>
                <Link to="/my-circles">My Circles</Link>
            </div>

            <ProfileCard>
                {/* Right Side */}
                {/* temp holder for profile pic */}
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "var(--accent-lightpink",
                        borderRadius: "var(--br-sm)",
                        height: "40px",
                        width: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "16px",
                    }}
                    className="profilepicture"
                >
                    J
                </div>

                {/* to input profile details */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                    }}
                    className="profileitems"
                >
                    <ProfileName className="profilename">John Doe</ProfileName>
                    <ProfileInfo className="profileinfo">
                        Y3 Information Systems
                    </ProfileInfo>
                </div>
            </ProfileCard>
        </Nb>
    );
}

const Nb = styled.nav`
    margin-left: auto;
    margin-right: auto;
    padding: 8px 24px;
    display: flex;
    box-shadow: var(--shadow);
    align-items: center;
    justify-content: space-between;
`;

const ProfileCard = styled.div`
    min-width: 200px;
    display: flex;
    flex-direction: row;

    &:hover {
        cursor: pointer;
        text-shadow: 1px 1px 10px var(--accent-lightpink);
        .profilename {
            color: var(--accent-darkpink);
        }
        .profileinfo {
            color: var(--accent-lightpink);
        }
        .profilepicture {
            box-shadow: var(--shadow);
        }
    }
`;

const ProfileName = styled.span`
    font-size: var(--fs-b4);
    color: var(--base-100);
`;

const ProfileInfo = styled.span`
    font-size: var(--fs-b3);
    color: var(--base-20);
`;

export default Navbar;
