export type RoomName = 'Registro' | 'Sala 1' | 'Sala 2';

type ApiResult<T> = T | { error: string };

async function callAttendees<T>(action: string, body: Record<string, unknown>): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  if (!baseUrl) throw new Error('La conexión con la base de datos no está configurada.');

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/functions/v1/attendees/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Sin conexión. Revisa tu internet e intenta de nuevo.');
  }

  const payload = (await response.json().catch(() => null)) as ApiResult<T> | null;
  const isError = payload !== null && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string';
  if (!response.ok || !payload || isError) {
    const message = isError ? payload.error : 'No pudimos completar la solicitud.';
    throw new Error(message);
  }
  return payload as T;
}

export type RegisterResult = { qr_token: string; email_sent: boolean };

export function registerAttendee(fullName: string, email: string) {
  return callAttendees<RegisterResult>('register', { full_name: fullName, email });
}

export type BadgeResult = { full_name: string; qr_png: string };

export function getBadge(token: string) {
  return callAttendees<BadgeResult>('badge', { token });
}

export type CheckInResult = { status: 'checked_in' | 'already'; full_name: string; room: RoomName };

export function checkInAttendee(token: string, room: RoomName) {
  return callAttendees<CheckInResult>('checkin', { token, room });
}

export type LeadResult = { status: 'captured' | 'already'; full_name: string; company_name: string };

export function captureLead(token: string, companyName: string) {
  return callAttendees<LeadResult>('lead', { token, company_name: companyName });
}