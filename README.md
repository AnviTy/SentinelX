# SentinelX

### Automated SOC & SOAR Platform for Security Alert Detection, Enrichment and Response

SentinelX is a cloud-oriented Security Orchestration, Automation and Response (SOAR) platform designed to streamline the security alert lifecycle.

It processes security alerts through detection, risk scoring, MITRE ATT&CK mapping, threat-intelligence enrichment, incident management and automated response playbooks. n8n is used for workflow orchestration and response automation.

---

## Overview

Traditional SOC environments require analysts to manually investigate alerts, gather threat intelligence, determine severity, map attacks to known techniques and initiate response actions.

SentinelX aims to reduce this manual effort by connecting these stages into a single workflow:

```text
Security Event
      ↓
   Detection
      ↓
  Alert Ingestion
      ↓
   Risk Scoring
      ↓
MITRE ATT&CK Mapping
      ↓
Threat Intelligence
      ↓
Incident Creation
      ↓
 Playbook Selection
      ↓
n8n Orchestration
      ↓
 Automated Response