export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'officer' | 'user';
  organization_type?: string;
}

export interface LoginRequest {
  email: string;
  password?: string; // or credentials
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  organization_type: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface InspectionImage {
  id: string;
  url: string;
  label: 'Front' | 'Back' | 'Side' | 'Bottom';
}

export interface ExtractedField {
  name: string;
  value: string;
  confidence: number;
  boundingBox?: number[];
  manualCorrection?: boolean;
}

export interface OcrResult {
  text: string;
  fields: ExtractedField[];
  annotatedImageUrl?: string;
}

export interface ComplianceRule {
  id: string;
  rule_id: string;
  title: string;
  category: string;
  subcategory?: string;
  field_name: string;
  rule_type: 'presence' | 'format' | 'value_match';
  condition: string;
  severity: 'critical' | 'warning' | 'info';
  legal_reference: string;
  violation_message: string;
  recommendation: string;
  applicability: string[];
  is_active: boolean;
}

export interface RuleCreate extends Omit<ComplianceRule, 'id'> {}
export interface RuleUpdate extends Partial<RuleCreate> {}

export interface ComplianceResult {
  rule_id: string;
  field_name: string;
  status: 'PASS' | 'FAIL' | 'REVIEW';
  detected_value?: string;
  expected_value?: string;
  evidence?: string;
  message?: string;
  recommendation?: string;
  severity?: 'critical' | 'warning' | 'info';
  legal_reference?: string;
  category?: string;
  description?: string;
}

export interface ComplianceReport {
  score: number;
  status: 'COMPLIANT' | 'NON-COMPLIANT' | 'REVIEW';
  checks: ComplianceResult[];
}

export type ProcessingStatus = 'Uploading' | 'Processing Image' | 'Running OCR' | 'Extracting Fields' | 'Checking Rules' | 'Generating Report' | 'Complete' | 'Failed';

export interface Inspection {
  id: string;
  product_name: string;
  brand_name: string;
  commodity_type: string;
  category: string;
  images: InspectionImage[];
  status: ProcessingStatus;
  created_at: string;
  updated_at: string;
  ocr_result?: OcrResult;
  compliance_report?: ComplianceReport;
}

export interface InspectionCreate {
  product_name: string;
  brand_name: string;
  commodity_type: string;
  category: string;
}

export interface DashboardStats {
  totalScanned: number;
  compliantCount: number;
  issuesResolved: number;
  issuesPending: number;
}

export interface TrendData {
  month: string;
  scanned: number;
  compliant: number;
}

export interface ViolationData {
  name: string;
  value: number;
  color: string;
}
