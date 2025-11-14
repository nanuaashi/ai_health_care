import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { HealthWorker } from '@/lib/models/user';

// PATCH - Update health worker status (approve/deny)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, denialReason } = body;
    const { id } = params;

    if (!['approved', 'denied'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "approved" or "denied"' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection<HealthWorker>('users');

    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === 'denied' && denialReason) {
      updateData.denialReason = denialReason;
    } else if (status === 'approved') {
      updateData.denialReason = undefined;
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id), role: 'health-worker' },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Health worker not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Health worker ${status} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update health worker error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

