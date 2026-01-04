import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { scholarships } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

export default function ScholarshipsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <GraduationCap className="w-8 h-8"/>
            Scholarships & Schemes
        </h1>
        <p className="text-muted-foreground">
          Find financial aid opportunities to support your education.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
             <CardTitle>Filter Opportunities</CardTitle>
            <div className="grid grid-cols-2 md:flex gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="jk">J&K</SelectItem>
                  <SelectItem value="all">All India</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="girl">Girl Students</SelectItem>
                  <SelectItem value="sc_st_obc">SC/ST/OBC</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{scholarship.name}</CardTitle>
              <CardDescription>{scholarship.provider}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-semibold">{scholarship.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="font-semibold">{scholarship.deadline}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {scholarship.eligibility.state?.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                {scholarship.eligibility.category?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                {scholarship.eligibility.income && <Badge variant="secondary">Income: {scholarship.eligibility.income}</Badge>}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full">
                <Link href={scholarship.link} target="_blank">
                  Apply Now <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
