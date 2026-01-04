import { Stethoscope, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const doctors = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Orthopedic Surgeon',
    address: '123, Wellness Clinic, Juhu, Mumbai',
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Rheumatologist',
    address: '456, HealthFirst Hospital, Andheri, Mumbai',
  },
  {
    name: 'Dr. Priya Mehta',
    specialty: 'Physiotherapist',
    address: '789, Active Life Physio, Bandra, Mumbai',
  },
];

export default function FindADoctorPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Stethoscope className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Find a Specialist
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Connect with experienced doctors and physiotherapists in your area.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Enter your city or pincode" className="text-base" />
          <Button type="submit">Search</Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold font-headline">Doctors in Mumbai</h2>
        {doctors.map((doctor) => (
          <Card key={doctor.name} className="shadow-md transform transition-transform duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline">{doctor.name}</CardTitle>
              <p className="text-primary font-semibold">{doctor.specialty}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{doctor.address}</span>
              </div>
              <Button>Book Appointment</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
