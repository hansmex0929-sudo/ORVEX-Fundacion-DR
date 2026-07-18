# Database Domain Model

This is the initial logical model. Codex must convert it into reviewed Prisma models and migrations in phases rather than creating every table in one unreviewable migration.

## Shared fields

Most operational entities require: `id`, `tenantId`, `status`, `createdAt`, `createdById`, `updatedAt`, `updatedById`, optional `version`, optional archival metadata, and source/provenance where imported.

## Identity and household core

- Tenant
- User
- Role
- Permission
- UserRole
- RolePermission
- Session
- MfaMethod
- Person
- PersonName
- PersonIdentifier (restricted)
- ContactMethod
- Address
- GeoPoint
- PersonAddress
- Relationship
- Household
- HouseholdMember
- FamilyUnit
- Organization
- OrganizationContact
- DuplicateCandidate
- MergeReview
- MergeHistory
- Consent
- PrivacyPreference

## Intake and case management

- Intake
- IntakeSource
- Case
- CaseAssignment
- CaseNote
- CasePlan
- CaseGoal
- HomeVisit
- FollowUp
- Referral
- ReferralOutcome
- SafeguardingConcern
- Incident
- CaseClosure

## Assessments and eligibility

- AssessmentTemplate
- AssessmentQuestion
- Assessment
- AssessmentAnswer
- VulnerabilityFactor
- RiskScore
- RiskScoreExplanation
- EligibilityRule
- EligibilityEvaluation
- HumanDecision
- DecisionOverride

Assessment domains include household composition, income, expenses, employment, housing, utilities, food security, health-support needs, disability, education, dependents, disaster exposure, and community access.

## Assistance and approvals

- AssistanceProgram
- AssistanceRequest
- AssistanceItem
- AssistancePlan
- BenefitLimit
- DuplicateBenefitAlert
- ApprovalWorkflow
- ApprovalStep
- ApprovalDecision
- Disbursement
- RecipientAcknowledgement
- AssistanceOutcome

## Inventory and procurement

- Item
- ItemCategory
- UnitOfMeasure
- Warehouse
- WarehouseLocation
- InventoryLot
- SerialItem
- StockTransaction
- Receipt
- ReceiptLine
- Inspection
- QuarantineRecord
- StockTransfer
- StockAdjustment
- KitDefinition
- KitComponent
- KitAssembly
- Reservation
- Allocation
- ExpirationAlert
- Recall
- LossDamageRecord
- Vendor
- PurchaseRequest
- PurchaseOrder

## Logistics and delivery

- Vehicle
- DriverQualification
- Route
- RouteStop
- Delivery
- DeliveryLine
- Manifest
- LoadEvent
- ChainOfCustodyEvent
- ProofOfDelivery
- DeliveryAttempt
- DeliveryException
- GPSBreadcrumb (retention-controlled)

## Volunteers and employees

- VolunteerProfile
- VolunteerApplication
- Skill
- VolunteerSkill
- LanguageCapability
- Certification
- BackgroundCheckStatus
- Availability
- Shift
- Assignment
- Attendance
- VolunteerHour
- TrainingCourse
- TrainingCompletion
- Waiver
- Evaluation
- Recognition
- EmployeeProfile

## Projects and programs

- Project
- Program
- ProjectLocation
- ProjectMember
- ProjectPartner
- Milestone
- Task
- Risk
- Budget
- BudgetLine
- Indicator
- IndicatorMeasurement
- Evidence
- ProjectBeneficiary
- ProjectCloseout
- LessonLearned

## Medical and education support

- MedicalSupportProfile
- MedicalSupportRequest
- MedicalReferral
- AccommodationNeed
- MedicalSupportDocument
- EducationProfile
- SchoolEnrollment
- EducationSupportRequest
- ScholarshipOrTuitionSupport
- SchoolSupplyDistribution
- DeviceAssignment
- EducationOutcome

These entities require elevated permission scopes and access logging.

## Documents and communications

- Document
- DocumentVersion
- DocumentCategory
- DocumentLink
- ExpirationRule
- Communication
- CommunicationParticipant
- MessageTemplate
- Notification
- CommunicationConsent

## Compliance and audit

- AuditEvent
- SensitiveAccessEvent
- Policy
- PolicyVersion
- PolicyAcknowledgement
- ComplianceRequirement
- ComplianceEvidence
- AccessReview
- SecurityIncident
- DataExport
- RetentionRule
- LegalHold

## Lightweight donations

- DonorProfile
- Donation
- DonationItem
- DonationRestriction
- ReceiptDocument
- ReconciliationRecord

Do not build complex fundraising campaigns, donor scoring, donor journeys, peer-to-peer fundraising, or marketing automation in the initial program.

## AI and analytics

- ModelDefinition
- ModelVersion
- ModelRun
- Recommendation
- RecommendationExplanation
- RecommendationDecision
- FeatureSnapshot
- ModelPerformanceMetric
- AnomalyAlert

Never overwrite historical model output. Preserve model version, input snapshot/reference, explanation, reviewer, decision, and override reason.

## Data integrity rules

- A person must not be created without duplicate-search execution or an explicitly audited bypass.
- Household membership dates cannot overlap in logically contradictory ways without review.
- Assistance cannot be approved by the requester when separation-of-duties policy requires another approver.
- Stock cannot fall below zero unless a controlled reconciliation workflow permits it.
- Proof of delivery cannot be silently replaced.
- Sensitive records must never appear in general-purpose exports.
- Audit events are append-only.
