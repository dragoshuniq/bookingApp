import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { signOut } = useAuth();
  return <Button onClick={signOut}>dasdas </Button>;
}

export default Dashboard;
