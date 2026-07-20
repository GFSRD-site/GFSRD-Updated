
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Link} from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export function NewsSection() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  return (
    <>
      <section id="news-events" className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                Latest Updates
              </span>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
                News & Events
              </h2>
            </div>

            <Button asChild variant="ghost" className="mt-4 md:mt-0 text-primary">
              <Link to="/event">
                View All Updates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-3"
            >
              <Card className="border-primary/20 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/10">
                <CardContent className="p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs mb-4">
                    📢 Featured Announcement
                  </span>

                  <h3 className="text-2xl font-bold mb-3">
                    International Summer Courses on Methodology for Development Research
                  </h3>

                  <p className="text-muted-foreground line-clamp-2 mb-6">
                    Global Forum for Sustainable Rural Development in collaboration
                    with National Institute of Technology, Malang, Indonesia is
                    organising INTERNATIONAL SUMMER COURSES on Methodology for
                    Development Research (Quantitative and Qualitative).
                  </p>

                  <Button onClick={() => setOpenAnnouncement(true)}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Dialog open={openAnnouncement} onOpenChange={setOpenAnnouncement}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              International Summer Courses on Methodology for Development Research
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">

            <p className="text-muted-foreground">
              Global Forum for Sustainable Rural Development in collaboration
              with National Institute of Technology, Malang, Indonesia is
              organising INTERNATIONAL SUMMER COURSES on Methodology for
              Development Research (Quantitative and Qualitative) in the month
              of June and July (Every Saturday and Sunday).
            </p>

            <div>
              <h3 className="font-semibold mb-2">
                Registration Link
              </h3>

              <a
                href="https://forms.gle/noj7MBmU1gfU41xg8"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline break-all"
              >
                https://forms.gle/noj7MBmU1gfU41xg8
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">
                    Indian Participants
                  </h3>

                  <ul className="space-y-2">
                    <li>Faculty / Professionals : ₹1000 (One Course)</li>
                    <li>Faculty / Professionals : ₹1500 (Both Courses)</li>
                    <li>Students / Research Scholars : ₹500 (One Course)</li>
                    <li>Students / Research Scholars : ₹1000 (Both Courses)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">
                    International Participants
                  </h3>

                  <ul className="space-y-2">
                    <li>Faculty / Professionals : USD 10 (One Course)</li>
                    <li>Faculty / Professionals : USD 15 (Both Courses)</li>
                    <li>Students / Research Scholars : USD 5 (One Course)</li>
                    <li>Students / Research Scholars : USD 10 (Both Courses)</li>
                  </ul>
                </CardContent>
              </Card>

            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
