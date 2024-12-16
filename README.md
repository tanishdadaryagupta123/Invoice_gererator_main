# Invoice Generator Application

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create and download invoices in PDF format.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Invoice Generator application provides a user-friendly interface for creating invoices. Users can log in, register, add product details, and generate invoices that can be downloaded as PDFs. The application utilizes Puppeteer for PDF generation and Redux for state management.

## Features

- **Login Page**: User authentication with email validation and appropriate success/error messages.
- **Registration Page**: User registration with email validation using Regex.
- **Add Product Page**: Input fields for product name, quantity, and rate, with automatic calculations for total and GST.
- **Generate PDF**: Generate and download invoices as PDFs with the option to store details in the backend.

## Technologies Used

- **Frontend**: 
  - ReactJS
  - Redux for state management
  - Tailwind CSS for styling
  - ViteJS as the build tool
  - Typescript for type safety

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database management
  - Puppeteer for PDF generation

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Keshab1113/Invoice_Generator.git
