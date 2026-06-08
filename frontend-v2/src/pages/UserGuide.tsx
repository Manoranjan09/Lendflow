import {
  BookOpen,
  Users,
  CreditCard,
  BarChart3,
  Bot,
  Settings,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function UserGuide() {
  const sections = [
    {
      value: "dashboard",
      title: "Dashboard Overview",
      icon: <BarChart3 className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Dashboard gives a complete overview of
            your lending business. You can monitor active loans, total
            interest earned, overdue accounts, and repayment trends.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> Dashboard आपके पूरे lending business का
            summary दिखाता है। यहां से आप active loans, earned interest,
            overdue borrowers और repayment trends देख सकते हैं।
          </p>
        </>
      ),
    },

    {
      value: "borrowers",
      title: "Borrower Management",
      icon: <Users className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Add and manage borrowers. Store their
            personal details, contact information, uploaded documents,
            repayment history, and AI-generated risk analysis.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> Borrowers section में आप ग्राहक जोड़
            सकते हैं, उनके documents upload कर सकते हैं, repayment history
            देख सकते हैं और AI Risk Analysis प्राप्त कर सकते हैं।
          </p>
        </>
      ),
    },
{
  value: "risk-analysis",
  title: "AI Risk Analysis",
  icon: <Bot className="h-5 w-5" />,
  content: (
    <>
      <p>
        <strong>English:</strong> AI Risk Analysis evaluates borrower
        information and repayment history to estimate lending risk.
      </p>

      <ul className="list-disc pl-6 mt-2">
        <li>🟢 Low Risk</li>
        <li>🟡 Medium Risk</li>
        <li>🔴 High Risk</li>
      </ul>

      <p className="mt-3">
        <strong>हिंदी:</strong> AI borrower की जानकारी और repayment
        history को analyze करके risk level बताता है।
      </p>
    </>
  )
},
{
  value: "assistant-guide",
  title: "How to Use AI Assistant",
  icon: <Bot className="h-5 w-5" />,
  content: (
    <>
      <p><strong>Example Questions:</strong></p>

      <ul className="list-disc pl-6 mt-2">
        <li>Show overdue borrowers</li>
        <li>Summarize my portfolio</li>
        <li>Which loans are high risk?</li>
        <li>Predict upcoming collections</li>
      </ul>

      <p className="mt-3">
        हिंदी: AI Assistant natural language में पूछे गए questions का
        जवाब देता है और portfolio insights प्रदान करता है।
      </p>
    </>
  )
},
{
  value: "analytics-guide",
  title: "Understanding Analytics",
  icon: <BarChart3 className="h-5 w-5" />,
  content: (
    <>
      <p>
        <strong>English:</strong> Analytics helps lenders understand
        portfolio health, recovery performance and risk exposure.
      </p>

      <ul className="list-disc pl-6 mt-2">
        <li>Portfolio Health</li>
        <li>Recovery Rate</li>
        <li>Overdue Trends</li>
        <li>Risk Exposure</li>
      </ul>

      <p className="mt-3">
        <strong>हिंदी:</strong> Analytics section lending business की
        performance और risk को समझने में मदद करता है।
      </p>
    </>
  )
},
    {
      value: "loans",
      title: "Loan Management",
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Create and track loans. Choose simple
            or compound interest, repayment schedule, duration, and monitor
            loan performance.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> Loan section में आप नया loan बना सकते
            हैं, interest type चुन सकते हैं, tenure सेट कर सकते हैं और
            repayment track कर सकते हैं।
          </p>
        </>
      ),
    },

    {
      value: "repayment",
      title: "Repayments",
      icon: <CheckCircle className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Record borrower repayments. The system
            automatically updates outstanding balance and repayment status.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> जब borrower payment करता है तो repayment
            add करें। System automatically remaining balance calculate
            करता है।
          </p>
        </>
      ),
    },

    {
      value: "analytics",
      title: "Analytics & Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Analytics provides portfolio health,
            recovery rates, risk exposure, overdue trends, and business
            insights.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> Analytics section आपकी lending portfolio
            performance, recovery rate, overdue trends और risk exposure
            दिखाता है।
          </p>
        </>
      ),
    },

    {
      value: "assistant",
      title: "AI Assistant",
      icon: <Bot className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> AI Assistant helps analyze loan data,
            overdue accounts, borrower risk, collection forecasts, and
            portfolio performance.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> AI Assistant आपके loan data को analyze
            करके overdue accounts, risk level और collection forecast बताता
            है।
          </p>
        </>
      ),
    },

    {
      value: "settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      content: (
        <>
          <p>
            <strong>English:</strong> Configure lender profile,
            notifications, language preferences, and default lending
            settings.
          </p>

          <p className="mt-3">
            <strong>हिंदी:</strong> Settings में lender profile,
            notifications, language और lending defaults configure किए जाते
            हैं।
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <BookOpen className="h-8 w-8" />
            CreditFlow AI User Guide
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <strong>English:</strong> Welcome to CreditFlow AI — an
            AI-powered Loan Interest Management Platform designed to help
            lenders manage borrowers, loans, repayments, analytics, and
            portfolio insights efficiently.
          </p>

          <p>
            <strong>हिंदी:</strong> CreditFlow AI एक AI-powered Loan Interest
            Management Platform है जो lenders को borrowers, loans,
            repayments, analytics और portfolio insights manage करने में
            मदद करता है।
          </p>
        </CardContent>
      </Card>
<Card>
  <CardHeader>
    <CardTitle>🚀 What is CreditFlow AI?</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    <p>
      <strong>English:</strong> CreditFlow AI is an AI-powered Loan Interest
      Management Platform that helps lenders manage borrowers, loans,
      repayments, risk assessment, analytics, and portfolio monitoring from
      a single dashboard.
    </p>

    <p>
      <strong>हिंदी:</strong> CreditFlow AI एक AI-powered Loan Interest
      Management Platform है जो lenders को borrowers, loans, repayments,
      risk assessment और analytics को एक ही dashboard से manage करने में
      मदद करता है।
    </p>
  </CardContent>
</Card>
<Card>
  <CardHeader>
    <CardTitle>👥 Who Should Use This Platform?</CardTitle>
  </CardHeader>

  <CardContent>
    <ul className="space-y-2">
      <li>✅ Private Lenders</li>
      <li>✅ Finance Companies</li>
      <li>✅ Loan Agencies</li>
      <li>✅ Recovery Teams</li>
      <li>✅ Microfinance Institutions</li>
    </ul>

    <p className="mt-4 text-muted-foreground">
      हिंदी: यह platform उन सभी लोगों के लिए उपयोगी है जो loans provide,
      track और recover करते हैं।
    </p>
  </CardContent>
</Card>
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Recommended Workflow</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <p>1️⃣ Create Borrower</p>
            <p>2️⃣ Upload Documents</p>
            <p>3️⃣ Create Loan</p>
            <p>4️⃣ Track Repayments</p>
            <p>5️⃣ Monitor Dashboard</p>
            <p>6️⃣ Review Analytics</p>
            <p>7️⃣ Use AI Assistant for Insights</p>
          </div>
        </CardContent>
      </Card>
<Card>
  <CardHeader>
    <CardTitle>🔄 Complete Loan Lifecycle</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="space-y-2 font-medium">
      <p>1️⃣ Borrower Created</p>
      <p>⬇️</p>

      <p>2️⃣ Documents Uploaded</p>
      <p>⬇️</p>

      <p>3️⃣ AI Risk Analysis</p>
      <p>⬇️</p>

      <p>4️⃣ Loan Created</p>
      <p>⬇️</p>

      <p>5️⃣ Interest Calculated</p>
      <p>⬇️</p>

      <p>6️⃣ Repayment Recorded</p>
      <p>⬇️</p>

      <p>7️⃣ Loan Closed</p>
    </div>
  </CardContent>
</Card>
<Card>
  <CardHeader>
    <CardTitle>❓ Frequently Asked Questions</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    <div>
      <p className="font-semibold">
        Can I edit borrower information?
      </p>
      <p>Yes, borrower details can be updated anytime.</p>
    </div>

    <div>
      <p className="font-semibold">
        Does repayment update automatically?
      </p>
      <p>
        Yes, outstanding balance and loan status are updated
        automatically.
      </p>
    </div>

    <div>
      <p className="font-semibold">
        Can I track overdue loans?
      </p>
      <p>
        Yes, Dashboard and Analytics provide overdue tracking.
      </p>
    </div>
  </CardContent>
</Card>
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle />
            Important Notes
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Always verify borrower details before approving loans.</li>
            <li>Regularly update repayment records.</li>
            <li>Review overdue accounts daily.</li>
            <li>Use AI Risk Analysis before issuing high-value loans.</li>
          </ul>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}