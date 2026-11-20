import { usePathname } from 'expo-router';
import { PlaceholderPage } from '../components/PlaceholderPage';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return <PlaceholderPage title="No encontramos esa página" description={`La ruta ${pathname} no existe.`} />;
}
