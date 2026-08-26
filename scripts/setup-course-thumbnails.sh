#!/bin/bash
# Copy/reuse existing course thumbnails under slug-based filenames in public/courses
cd "$(dirname "$0")/../public/courses" || exit 1

copy() { [ -f "$1" ] && cp "$1" "$2" 2>/dev/null || true; }

# CSE / IT
copy aws.png azure.png
copy aws.png cloud-computing.png
copy aws.png ccna-200-301.png
copy dataanalytics.jpg data-analytics.png
copy datascience.jpg data-engineering.png
copy python.png data-structures.png
copy ML.png deep-learning.png
copy ai.png agentic-ai.png
copy ai.png generative-ai-llm.png
copy ai.png ai-domain.png
copy ai.png quantum-computing.png
copy ai.png metaverse.png
copy java.jpg dotnet.png
copy java.jpg java-fullstack.png
copy automation.jpg devops.png
copy automation.jpg docker.png
copy FWD.png web-development.png
copy blockchain.png web3.png
copy sap.png sap-grc-arm.png
copy sap.png sap-mm.png
copy sap.png sap-security.png
copy sap.png sap-successfactors.png
copy sap.png sap-ui5-fiori.png
copy datascience.jpg sas-programming.png
copy salesForce.png servicenow.png
copy iot.jpg iot-cse.png
copy embedded_system.webp computer-organization.png
copy python.png dbms.png
copy datascience.jpg probability-statistics.png
copy "se with java.png" manual-testing.png

# ECE
copy vlsi.png signals-and-systems.png
copy embedded_system.webp scld.png

# Mechanical / Civil / Chemical
copy robotics.png drone-engineering.png
copy Machinefor.png ic-engine-design.png
copy ACad.jpeg construction-planning.png
copy ACad.jpeg aspen-hysys.png
copy ACad.jpeg aspen-plus.png
copy ACad.jpeg petroleum-engineering.png
copy ACad.jpeg catia.png

# Management
copy FINANCE.png acca-f4-business.png
copy FINANCE.png investment-banking.png
copy FINANCE.png entrepreneurship.png
copy FINANCE.png ai-for-economics.png
copy dataanalytics.jpg power-bi.png
copy dataanalytics.jpg microsoft-excel.png
copy hrm.webp placement-preparation.png
copy digitalmarketing.jpg product-management.png
copy FINANCE.png stock-marketing.png

# Bio
copy datascience.jpg biostatistics.png
copy datascience.jpg clinical-sas.png
copy medicalCoding.jpeg pharmacovigilance.png
copy medicalCoding.jpeg psychology.png

echo "Course thumbnail copies complete."
