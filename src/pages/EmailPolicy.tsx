import { Card } from "@/components/ui/card";

export default function EmailPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-background py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Email and Anti-Spam Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Entrepreneurship Cell, IIT Kharagpur
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Card className="p-8 md:p-12 shadow-elevated">
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p className="mb-6">
                E-Cell IIT Kharagpur does not permit the use of unsolicited bulk email
                (spam) to promote this website, our events, or our programs. This applies
                to all members, volunteers, partners, affiliates and any third parties
                acting on our behalf.
              </p>

              <ol className="list-decimal pl-6 space-y-4 mb-8 text-foreground">
                <li>We do not purchase, rent, or scrape email lists.</li>
                <li>
                  Email is sent only to people who have registered with us, subscribed,
                  previously corresponded with us, or who publish their contact details
                  for professional inquiries relevant to our work. Such messages are
                  individually addressed, low in volume, and identify the sender clearly.
                </li>
                <li>
                  Every message includes a clear way to opt out. Opt-out requests are
                  honored promptly and permanently.
                </li>
                <li>
                  All mail is sent from our own authenticated domain (SPF, DKIM, DMARC).
                </li>
                <li>
                  Members who violate this policy lose access to our email systems.
                </li>
              </ol>

              <p className="font-medium text-foreground">
                To report unwanted email from us, or to opt out, contact{" "}
                <a href="mailto:admin@ecell-iitkgp.in" className="text-primary hover:underline">
                  admin@ecell-iitkgp.in
                </a>
                . Reports are reviewed and acted upon.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
