# 🔄 How to Force a Fresh Build in Railway

If Railway seems to be using cached or old code, here's how to force it to rebuild:

## Quick Fix (Recommended)

**For Frontend Service:**
1. Click Frontend service → **Deployments** tab
2. Look for the failed deployment
3. Click **"Rebuild"** or **"Redeploy"** button
4. Railway will pull the latest code from GitHub and rebuild
5. Wait 2-3 minutes

**For Backend Service:**
1. Click Backend service → **Deployments** tab
2. Click **"Rebuild"** or **"Redeploy"** button
3. Wait 2-3 minutes

## If Rebuild Doesn't Work

Try this nuclear option:

1. **Delete the service completely:**
   - Click the service
   - Look for Settings or Options menu
   - Click "Delete Service"
   - Confirm deletion

2. **Re-add the service:**
   - Click "Add Service"
   - Select "GitHub Repo"
   - Pick GRCTOOL
   - Set Root Directory again (`backend` or `frontend`)
   - Add environment variables again
   - Let it build fresh

3. **Give it time:**
   - Initial builds take 3-5 minutes
   - Check Logs tab to see progress

## Why This Happens

Railway caches Docker layers to speed up builds. Sometimes the cache gets stale or out of sync with your code. Forcing a rebuild clears that cache.

## Pro Tip

We pushed a small update to the Dockerfiles to force Railway to recognize the new code. This should trigger automatic rebuilds!
