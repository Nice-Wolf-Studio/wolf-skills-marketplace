# Security Review Workflow: {SECURITY_TASK_NAME}

**Workflow Type**: Security assessment, vulnerability remediation, or security feature implementation
**Estimated Duration**: {DURATION_ESTIMATE}
**Archetype**: security-guardian (determined via wolf-archetypes)
**Security Lens**: MANDATORY for this workflow

---

## Workflow Overview

This workflow orchestrates security-focused tasks, including security audits, vulnerability remediation, security feature implementation, and threat modeling.

**Agent Chain**:
```
pm-agent → [research-agent] → architect-lens-agent → coder-agent → qa-agent (security lens) → code-reviewer-agent
```

**Security Gates** (MANDATORY):
- ✅ Threat model documented → proceed to design
- ✅ Security scan clean (0 critical, ≤5 high) → proceed to review
- ✅ Penetration tests passing → proceed to merge
- ✅ Security review approved → proceed to deployment

**Duration Estimate**:
- Threat modeling: {THREAT_MODEL_DURATION}
- Security research: {RESEARCH_DURATION}
- Design: {DESIGN_DURATION}
- Implementation: {IMPLEMENTATION_DURATION}
- Security testing: {SECURITY_TESTING_DURATION}
- Security review: {SECURITY_REVIEW_DURATION}

---

## Security Workflow Types

### Type 1: Security Audit
- Full security assessment of existing system
- Identify vulnerabilities and attack vectors
- Prioritize remediation by severity

### Type 2: Vulnerability Remediation
- Fix specific CVE or security finding
- Patch vulnerable dependencies
- Validate fix effectiveness

### Type 3: Security Feature Implementation
- Add authentication/authorization
- Implement encryption
- Add security monitoring

**This workflow covers all three types. Adapt phases as needed.**

---

## Phase 1: Security Requirements & Threat Modeling (pm-agent)

**Owner**: pm-agent
**Template**: `/wolf-roles/templates/pm-agent-template.md`

### Input
- Security concern or requirement
- Vulnerability report (if remediation)
- Compliance requirements (OWASP, GDPR, SOC2, etc.)

### pm-agent Responsibilities
- [ ] Load wolf-principles (REQUIRED)
- [ ] Determine archetype: security-guardian (REQUIRED)
- [ ] Apply security lens (MANDATORY)
- [ ] Load wolf-governance security requirements
- [ ] Document threat model (STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- [ ] Identify attack surface
- [ ] Define security acceptance criteria
- [ ] Prioritize vulnerabilities by severity (Critical → High → Medium → Low)

### Threat Model Template (STRIDE)
```markdown
## Threat Model: {SECURITY_TASK_NAME}

### Attack Surface:
- {ATTACK_VECTOR_1}: {DESCRIPTION}
- {ATTACK_VECTOR_2}: {DESCRIPTION}

### Threats (STRIDE Analysis):
| Threat Type | Threat | Impact | Likelihood | Severity | Mitigation |
|-------------|--------|--------|------------|----------|------------|
| Spoofing | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |
| Tampering | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |
| Repudiation | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |
| Info Disclosure | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |
| Denial of Service | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |
| Privilege Escalation | {THREAT} | {IMPACT} | {LIKELIHOOD} | {SEVERITY} | {MITIGATION} |

### Assets to Protect:
- {ASSET_1}: {VALUE_AND_RISK}
- {ASSET_2}: {VALUE_AND_RISK}

### Security Acceptance Criteria:
- [ ] {CRITERION_1} (e.g., No SQL injection possible)
- [ ] {CRITERION_2} (e.g., All inputs validated)
- [ ] {CRITERION_3} (e.g., Authentication required for all endpoints)

### Compliance Requirements:
- {REQUIREMENT_1} (e.g., OWASP Top 10 compliance)
- {REQUIREMENT_2} (e.g., Data encrypted at rest and in transit)
```

### Output (Handoff to research-agent or architect-lens-agent)
```markdown
## Security Requirements: {SECURITY_TASK_NAME}

**Archetype**: security-guardian
**Security Lens**: APPLIED (MANDATORY)
**Severity**: {CRITICAL | HIGH | MEDIUM | LOW}

### Threat Model:
- Attack Surface: {ATTACK_SURFACE_SUMMARY}
- Primary Threats: {TOP_3_THREATS}
- Assets at Risk: {ASSETS}

### Security Acceptance Criteria:
- [ ] {CRITERION_1}
- [ ] {CRITERION_2}
- [ ] {CRITERION_3}

### Compliance:
- {COMPLIANCE_STANDARD}: {REQUIREMENTS}

**Proceed to security design or research.**
```

### Security Gate 1: Threat Model Complete?
- ✅ **Yes** → Proceed to Phase 2 (Research) or Phase 3 (Design)
- ❌ **No** → Complete threat model before proceeding

---

## Phase 2: Security Research (research-agent) [RECOMMENDED]

**Owner**: research-agent
**Template**: `/wolf-roles/templates/research-agent-template.md`
**When to Use**: Complex security features, novel attack vectors, or evaluating security tools/libraries

### Input (from pm-agent)
- Threat model
- Research question (e.g., "What's the best way to prevent CSRF attacks?")
- Time-box (typically 2-4 hours for security research)

### research-agent Responsibilities
- [ ] Load wolf-principles (Research-Before-Code)
- [ ] Load wolf-archetypes (research-prototyper)
- [ ] Research security best practices (OWASP, NIST, CWE)
- [ ] Evaluate security libraries/frameworks (minimum 3 alternatives)
- [ ] Review CVE databases for similar vulnerabilities
- [ ] Create proof-of-concept attack (in isolated environment)
- [ ] Document secure implementation patterns
- [ ] Recommend security controls

### Output (Handoff to architect-lens-agent)
```markdown
## Security Research Complete: {SECURITY_TASK_NAME}

**Time Spent**: {HOURS} hours

### Vulnerability Analysis:
- **Type**: {CWE_ID} - {CWE_NAME}
- **Severity**: {CVSS_SCORE} ({CRITICAL/HIGH/MEDIUM/LOW})
- **Exploitability**: {DESCRIPTION}

### Security Controls Evaluated:
| Control | Effectiveness | Complexity | Performance Impact | Recommendation |
|---------|---------------|------------|---------------------|----------------|
| Control 1 | {SCORE} | {SCORE} | {IMPACT} | ✅ Recommended |
| Control 2 | {SCORE} | {SCORE} | {IMPACT} | ⚠️ Fallback |
| Control 3 | {SCORE} | {SCORE} | {IMPACT} | ❌ Rejected |

### Recommended Security Control:
Use {CONTROL_NAME} because {RATIONALE}

### Implementation Pattern:
{SECURE_IMPLEMENTATION_EXAMPLE}

### References:
- OWASP: {OWASP_REFERENCE}
- CWE: {CWE_REFERENCE}
- CVE: {CVE_REFERENCE} (if applicable)

**Proceed to security architecture design.**
```

### Security Gate 2: Security Research Complete?
- ✅ **Yes** → Proceed to Phase 3 (Design)
- ❌ **No** → Additional research or escalate if no secure solution found

---

## Phase 3: Security Architecture Design (architect-lens-agent)

**Owner**: architect-lens-agent
**Template**: `/wolf-roles/templates/architect-agent-template.md`

### Input (from pm-agent or research-agent)
- Threat model
- Security research findings
- Compliance requirements

### architect-lens-agent Responsibilities
- [ ] Load wolf-principles (Defense-in-Depth, Principle #8)
- [ ] Load wolf-archetypes (security-guardian)
- [ ] Load wolf-governance (security ADR requirements)
- [ ] Design security controls at multiple layers (network, application, data)
- [ ] Apply principle of least privilege
- [ ] Design secure-by-default configuration
- [ ] Document security architecture in ADR
- [ ] Create security testing plan

### Security Architecture Principles
1. **Defense-in-Depth**: Multiple security layers (perimeter, network, host, application, data)
2. **Least Privilege**: Minimal permissions required for operation
3. **Fail Secure**: System fails to secure state, not open state
4. **Secure by Default**: Default configuration is most secure
5. **Complete Mediation**: Every access checked
6. **Open Design**: Security through design, not obscurity

### Output (Handoff to coder-agent)
```markdown
## Security Architecture Complete: {SECURITY_TASK_NAME}

**ADR**: ADR-XXX-security-{title}.md

### Security Architecture:

**Defense Layers**:
1. **Perimeter**: {PERIMETER_CONTROLS} (e.g., WAF, DDoS protection)
2. **Network**: {NETWORK_CONTROLS} (e.g., VPC, security groups)
3. **Host**: {HOST_CONTROLS} (e.g., OS hardening, IDS)
4. **Application**: {APP_CONTROLS} (e.g., input validation, auth)
5. **Data**: {DATA_CONTROLS} (e.g., encryption, access control)

### Security Components to Implement:
1. **{COMPONENT_1}**: {SECURITY_CONTROL}
   - Location: {FILE_PATH}
   - Security Pattern: {PATTERN}
   - Threat Mitigated: {THREAT}

2. **{COMPONENT_2}**: {SECURITY_CONTROL}
   - Location: {FILE_PATH}
   - Security Pattern: {PATTERN}
   - Threat Mitigated: {THREAT}

### Security Testing Requirements:
- [ ] Input validation tests (SQL injection, XSS, command injection)
- [ ] Authentication tests (brute force, session hijacking)
- [ ] Authorization tests (privilege escalation, IDOR)
- [ ] Cryptography tests (weak algorithms, key management)
- [ ] Configuration tests (secure defaults, hardening)

### Security Checklist for Implementation:
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Validate and sanitize all inputs
- [ ] Use strong authentication (bcrypt, scrypt, Argon2)
- [ ] Implement CSRF tokens
- [ ] Set secure HTTP headers (CSP, HSTS, X-Frame-Options)
- [ ] Use HTTPS everywhere
- [ ] Implement rate limiting
- [ ] Log security events
- [ ] Never log sensitive data (passwords, tokens, PII)

**Ready for secure implementation.**
```

### Security Gate 3: Security Design Approved?
- ✅ **Yes** → Proceed to Phase 4 (Implementation)
- ❌ **No** → Refine design until security requirements met

---

## Phase 4: Secure Implementation (coder-agent)

**Owner**: coder-agent
**Template**: `/wolf-roles/templates/coder-agent-template.md`

### Input (from architect-lens-agent)
- Security architecture and ADR
- Security controls to implement
- Security testing requirements

### coder-agent Responsibilities
- [ ] Load wolf-principles (Defense-in-Depth)
- [ ] Load wolf-archetypes (security-guardian)
- [ ] Apply security lens (MANDATORY)
- [ ] Load wolf-governance (security coding standards)
- [ ] Create security branch: `security/{issue-id}-{description}`
- [ ] Write security tests FIRST (threat-driven testing)
- [ ] Implement security controls following architecture
- [ ] Use secure libraries (no crypto from scratch)
- [ ] Avoid security anti-patterns (hardcoded secrets, weak crypto, unsafe deserialization)
- [ ] Run security scan (SAST: Semgrep, Bandit, etc.)
- [ ] Create PR with security impact analysis

### Security Coding Standards (MANDATORY)

**Input Validation**:
```python
# ✅ GOOD: Validate and sanitize
def process_user_input(user_input):
    if not isinstance(user_input, str):
        raise ValueError("Invalid input type")
    if len(user_input) > MAX_LENGTH:
        raise ValueError("Input too long")
    sanitized = html.escape(user_input)  # Prevent XSS
    return sanitized

# ❌ BAD: No validation
def process_user_input(user_input):
    return user_input  # VULNERABLE TO XSS
```

**SQL Injection Prevention**:
```python
# ✅ GOOD: Parameterized query
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# ❌ BAD: String concatenation
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")  # SQL INJECTION
```

**Authentication**:
```python
# ✅ GOOD: Strong hashing
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

# ❌ BAD: Weak hashing
import hashlib
hashed = hashlib.md5(password.encode()).hexdigest()  # WEAK
```

**Secrets Management**:
```python
# ✅ GOOD: Use environment variables or secrets manager
api_key = os.environ.get("API_KEY")

# ❌ BAD: Hardcoded secret
api_key = "sk_live_abc123"  # NEVER COMMIT SECRETS
```

### Output (Handoff to qa-agent)
```markdown
## Secure Implementation Complete: {SECURITY_TASK_NAME}

**PR**: #{PR_NUMBER}
**Branch**: security/{issue-id}-{description}

### Security Controls Implemented:
- {CONTROL_1}: {DESCRIPTION_AND_FILE_PATH}
- {CONTROL_2}: {DESCRIPTION_AND_FILE_PATH}

### Threats Mitigated:
- [x] {THREAT_1}: Mitigated by {CONTROL}
- [x] {THREAT_2}: Mitigated by {CONTROL}

### Security Tests Added:
- Input validation tests: {COUNT} tests
- Authentication tests: {COUNT} tests
- Authorization tests: {COUNT} tests
- Cryptography tests: {COUNT} tests

### Security Scan Results:
- **SAST**: {TOOL_NAME} - {RESULT} (0 critical, {HIGH_COUNT} high, {MEDIUM_COUNT} medium)
- **Dependency Scan**: {TOOL_NAME} - {RESULT}
- **Secrets Scan**: {TOOL_NAME} - {RESULT} (no secrets found)

### Security Acceptance Criteria Status:
- [x] {CRITERION_1}: Validated
- [x] {CRITERION_2}: Validated
- [x] {CRITERION_3}: Validated

**Ready for security testing.**
```

### Security Gate 4: Security Controls Implemented?
- ✅ **Yes** → Proceed to Phase 5 (Security Testing)
- ❌ **No** → Complete implementation or escalate blockers

---

## Phase 5: Security Testing (qa-agent with Security Lens)

**Owner**: qa-agent
**Template**: `/wolf-roles/templates/qa-agent-template.md`
**Security Lens**: MANDATORY

### Input (from coder-agent)
- PR with security implementation
- Security scan results
- Threat model

### qa-agent Responsibilities
- [ ] Load wolf-principles (Evidence-Based Decision Making)
- [ ] Load wolf-archetypes (security-guardian)
- [ ] Apply security lens (MANDATORY)
- [ ] Load wolf-governance (security quality gates)
- [ ] Run automated security tests (SAST, DAST, SCA)
- [ ] Perform manual penetration testing
- [ ] Validate threat model mitigations
- [ ] Test OWASP Top 10 vulnerabilities
- [ ] Verify secure configuration
- [ ] Document security test results

### Security Testing Checklist (OWASP Top 10 2021)

**A01: Broken Access Control**
- [ ] Test horizontal privilege escalation (access other users' data)
- [ ] Test vertical privilege escalation (access admin functions)
- [ ] Test IDOR (Insecure Direct Object Reference)

**A02: Cryptographic Failures**
- [ ] Verify encryption at rest and in transit
- [ ] Test for weak cryptographic algorithms
- [ ] Validate key management

**A03: Injection**
- [ ] Test SQL injection (SQLMap)
- [ ] Test XSS (cross-site scripting)
- [ ] Test command injection
- [ ] Test LDAP injection

**A04: Insecure Design**
- [ ] Review threat model coverage
- [ ] Validate defense-in-depth layers
- [ ] Test security controls

**A05: Security Misconfiguration**
- [ ] Test default credentials
- [ ] Verify secure HTTP headers
- [ ] Check unnecessary services disabled

**A06: Vulnerable and Outdated Components**
- [ ] Run dependency vulnerability scan
- [ ] Verify all CVEs patched

**A07: Identification and Authentication Failures**
- [ ] Test brute force protection
- [ ] Verify session management
- [ ] Test password policy

**A08: Software and Data Integrity Failures**
- [ ] Verify input validation
- [ ] Test deserialization security

**A09: Security Logging and Monitoring Failures**
- [ ] Verify security events logged
- [ ] Test alerting on security events

**A10: Server-Side Request Forgery (SSRF)**
- [ ] Test SSRF vectors
- [ ] Verify URL validation

### Security Testing Tools
- **SAST** (Static Analysis): Semgrep, Bandit (Python), Brakeman (Ruby)
- **DAST** (Dynamic Analysis): OWASP ZAP, Burp Suite
- **SCA** (Software Composition Analysis): Snyk, Dependabot
- **Secrets Scanning**: TruffleHog, GitLeaks

### Output (Handoff to code-reviewer-agent OR back to coder-agent if failed)

**If Security Tests Pass**:
```markdown
## Security Testing Complete: {SECURITY_TASK_NAME}

**PR**: #{PR_NUMBER}
**Security Result**: ✅ PASS

### Security Scan Results:
- **SAST**: ✅ 0 critical, 0 high, {MEDIUM_COUNT} medium (acceptable)
- **DAST**: ✅ No vulnerabilities found
- **SCA**: ✅ All dependencies up-to-date, no known CVEs
- **Secrets Scan**: ✅ No secrets detected

### OWASP Top 10 Testing:
- A01 Broken Access Control: ✅ Pass
- A02 Cryptographic Failures: ✅ Pass
- A03 Injection: ✅ Pass
- A04 Insecure Design: ✅ Pass
- A05 Security Misconfiguration: ✅ Pass
- A06 Vulnerable Components: ✅ Pass
- A07 Auth Failures: ✅ Pass
- A08 Integrity Failures: ✅ Pass
- A09 Logging Failures: ✅ Pass
- A10 SSRF: ✅ Pass

### Threat Model Validation:
- [x] {THREAT_1}: ✅ Mitigated and verified
- [x] {THREAT_2}: ✅ Mitigated and verified

### Penetration Test Results:
{PENTEST_SUMMARY}

**Ready for security review and merge.**
```

**If Security Tests Fail**:
```markdown
## Security Testing Failed: {SECURITY_TASK_NAME}

**PR**: #{PR_NUMBER}
**Security Result**: ❌ FAIL

### Critical Vulnerabilities Found:
1. **{CVE_OR_CWE_ID}**: {VULNERABILITY_DESCRIPTION}
   - Severity: CRITICAL
   - Impact: {IMPACT}
   - Remediation: {REMEDIATION_STEPS}

2. **{CVE_OR_CWE_ID}**: {VULNERABILITY_DESCRIPTION}
   - Severity: HIGH
   - Impact: {IMPACT}
   - Remediation: {REMEDIATION_STEPS}

### Required Fixes:
1. {FIX_1}
2. {FIX_2}

**PR BLOCKED until security vulnerabilities resolved. Return to coder-agent.**
```

### Security Gate 5: Security Tests Passing?
- ✅ **Yes (0 critical, ≤5 high)** → Proceed to Phase 6 (Security Review)
- ❌ **No** → Return to coder-agent for fixes, then re-test

---

## Phase 6: Security Code Review (code-reviewer-agent)

**Owner**: code-reviewer-agent
**Security Lens**: MANDATORY

### Input (from qa-agent)
- PR with passing security tests
- Security scan results
- Threat model

### code-reviewer-agent Responsibilities
- [ ] Load wolf-principles (Defense-in-Depth)
- [ ] Apply security lens (MANDATORY)
- [ ] Review security controls implementation
- [ ] Validate against threat model
- [ ] Check for security anti-patterns
- [ ] Verify secure coding standards followed
- [ ] Assess defense-in-depth layers
- [ ] Approve or request security hardening

### Security Review Checklist
- [ ] No hardcoded secrets or credentials
- [ ] Input validation comprehensive
- [ ] Output encoding prevents XSS
- [ ] Authentication strong and secure
- [ ] Authorization enforced at every access point
- [ ] Encryption used for sensitive data
- [ ] Secure HTTP headers configured
- [ ] Error messages don't leak sensitive info
- [ ] Logging comprehensive but doesn't log secrets
- [ ] Security tests comprehensive

### Output

**If Approved**:
```markdown
## Security Review Complete: {SECURITY_TASK_NAME}

**PR**: #{PR_NUMBER}
**Security Review**: ✅ APPROVED

### Security Assessment:
- Threat Model: ✅ All threats mitigated
- Defense-in-Depth: ✅ Multiple security layers
- Secure Coding: ✅ Standards followed
- Security Tests: ✅ Comprehensive coverage

### Security Improvements Delivered:
- {IMPROVEMENT_1}
- {IMPROVEMENT_2}

### Residual Risks (if any):
- {RISK_1}: {MITIGATION_STRATEGY}

**Approved for merge. Security posture improved.**
```

**If Changes Requested**:
```markdown
## Security Review: Hardening Required

**PR**: #{PR_NUMBER}
**Security Review**: ⚠️ HARDENING REQUIRED

### Security Concerns:
1. {CONCERN_1_WITH_RATIONALE}
2. {CONCERN_2_WITH_RATIONALE}

### Required Security Hardening:
1. {HARDENING_1}
2. {HARDENING_2}

**Return to coder-agent for security hardening.**
```

### Security Gate 6: Security Review Approved?
- ✅ **Yes** → Merge and monitor
- ❌ **No** → Return to coder-agent for hardening, then re-review

---

## Security Workflow Completion Checklist

### Security Artifacts Created ✅
- [ ] Threat model (STRIDE analysis)
- [ ] Security research report (if applicable)
- [ ] Security ADR documenting architecture
- [ ] Secure implementation PR
- [ ] Security test report (OWASP Top 10)
- [ ] Security scan results (SAST, DAST, SCA)
- [ ] Security code review
- [ ] Security journal entries

### Security Gates Passed ✅
- [ ] Threat model complete and approved
- [ ] Security scan clean: 0 critical, ≤5 high
- [ ] OWASP Top 10 tests passing
- [ ] Penetration tests passing
- [ ] Security code review approved
- [ ] PR merged to main

### Security Monitoring Configured ✅
- [ ] Security events logged
- [ ] Alerts configured for security incidents
- [ ] Dashboard showing security metrics
- [ ] Runbook for security incident response

---

## Red Flags - STOP

If you catch yourself thinking:

- ❌ **"Security testing can wait, functionality first"** - FORBIDDEN. Security is not optional. Test security from the start.
- ❌ **"This vulnerability is low severity, ignore it"** - NO. Low severity vulnerabilities compound. Fix all findings.
- ❌ **"Hardcoded API key is fine for now"** - ABSOLUTELY NOT. "For now" becomes permanent. Use secrets management.
- ❌ **"Encryption adds complexity, skip it"** - DANGEROUS. Encrypt sensitive data. Complexity is manageable, breaches are not.
- ❌ **"Input validation is too restrictive"** - Wrong. Permissive input validation = vulnerabilities. Validate strictly.
- ❌ **"We'll fix security issues in the next sprint"** - NO. Security debt compounds. Fix immediately.
- ❌ **"Security scan has false positives, ignore warnings"** - STOP. Investigate all findings. Don't assume false positives.
- ❌ **"One security layer is enough"** - NO. Defense-in-Depth (Principle #8). Multiple layers required.

**STOP. Use wolf-governance to verify security requirements are non-negotiable.**

---

## Success Criteria

### Security Improved ✅
- [ ] All threats from threat model mitigated
- [ ] Security scan clean: 0 critical, ≤5 high
- [ ] OWASP Top 10 compliance validated
- [ ] Penetration tests passing
- [ ] No hardcoded secrets
- [ ] Strong authentication and authorization
- [ ] Encryption for sensitive data
- [ ] Security monitoring operational

### Quality Validated ✅
- [ ] Security tests comprehensive and passing
- [ ] Security code review approved
- [ ] Defense-in-depth layers verified
- [ ] Secure coding standards followed
- [ ] Security documentation complete

### Compliance Met ✅ (if applicable)
- [ ] OWASP compliance
- [ ] GDPR compliance (if PII handled)
- [ ] SOC2 compliance (if applicable)
- [ ] Industry-specific compliance (HIPAA, PCI-DSS, etc.)

---

**Security Workflow Duration**: {TOTAL_DURATION}
**Vulnerabilities Remediated**: {VULN_COUNT}
**Security Posture**: IMPROVED ✅

**Security task {SECURITY_TASK_NAME} successfully completed.**
