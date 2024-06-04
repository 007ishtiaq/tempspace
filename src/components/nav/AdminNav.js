import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Level 1
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub2" className="nav-link">
          Sub Level 2
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/banner" className="nav-link">
          Banner
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/shipping" className="nav-link">
          Shipping
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password Reset
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
